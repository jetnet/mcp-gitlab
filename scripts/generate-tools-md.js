#!/usr/bin/env node

/**
 * Script to convert src/utils/tools-data.ts to TOOLS.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read tools-data.ts file
const toolsDataPath = path.resolve(__dirname, '../src/utils/tools-data.ts');
const outputPath = path.resolve(__dirname, '../TOOLS.md');

// Convert heading text to GitHub-compatible anchor
function generateAnchor(text) {
  return text
    .toLowerCase()
    .replace(/&/g, '')        // Remove ampersands
    .replace(/[/]/g, '')     // Remove forward slashes
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/--+/g, '-')     // Collapse multiple hyphens
    .replace(/-$/, '');        // Remove trailing hyphen
}

function extractObjectAfterKey(text, key) {
  const keyMatch = new RegExp(`${key}\\s*:`).exec(text);
  if (!keyMatch) return null;

  const openIndex = text.indexOf('{', keyMatch.index + keyMatch[0].length);
  if (openIndex === -1) return null;

  let braceCount = 0;
  for (let i = openIndex; i < text.length; i++) {
    if (text[i] === '{') braceCount++;
    if (text[i] === '}') braceCount--;
    if (braceCount === 0) {
      return text.slice(openIndex + 1, i);
    }
  }

  return null;
}

function extractRequired(text, useLastMatch = false) {
  const matches = [...text.matchAll(/required:\s*\[([\s\S]*?)\]/g)];
  const requiredMatch = useLastMatch ? matches.at(-1) : matches[0];
  return requiredMatch
    ? (requiredMatch[1].match(/['"]([^'"]+)['"]/g) || []).map((r) => r.replace(/['"]/g, ''))
    : [];
}

function splitTopLevelProperties(propertiesContent) {
  const properties = [];
  let index = 0;

  while (index < propertiesContent.length) {
    while (index < propertiesContent.length && /[\s,]/.test(propertiesContent[index])) index++;

    const nameMatch = /^[a-zA-Z0-9_]+/.exec(propertiesContent.slice(index));
    if (!nameMatch) break;

    const name = nameMatch[0];
    index += name.length;
    while (index < propertiesContent.length && /\s/.test(propertiesContent[index])) index++;
    if (propertiesContent[index] !== ':') break;
    index++;
    while (index < propertiesContent.length && /\s/.test(propertiesContent[index])) index++;
    if (propertiesContent[index] !== '{') break;

    const openIndex = index;
    let braceCount = 0;
    for (; index < propertiesContent.length; index++) {
      if (propertiesContent[index] === '{') braceCount++;
      if (propertiesContent[index] === '}') braceCount--;
      if (braceCount === 0) {
        properties.push({ name, content: propertiesContent.slice(openIndex + 1, index) });
        index++;
        break;
      }
    }
  }

  return properties;
}

function parseParameters(propertiesContent, required, prefix = '') {
  const parameters = [];

  for (const property of splitTopLevelProperties(propertiesContent)) {
    const typeMatch = property.content.match(/type:\s*['"]([^'"]+)['"]/);
    const descMatch = property.content.match(/description:\s*['"]([^'"]+)['"]/);
    if (!typeMatch || !descMatch) continue;

    const parameterName = prefix ? `${prefix}.${property.name}` : property.name;
    parameters.push({
      name: parameterName,
      type: typeMatch[1],
      description: descMatch[1],
      required: required.includes(property.name)
    });

    const nestedProperties = extractObjectAfterKey(property.content, 'properties');
    if (nestedProperties) {
      parameters.push(...parseParameters(nestedProperties, extractRequired(property.content), parameterName));
    }
  }

  return parameters;
}

try {
  // Read the source file
  const toolsData = fs.readFileSync(toolsDataPath, 'utf8');
  
  // Extract tool definitions using regex
  const toolDefinitionsRegex = /export const toolDefinitions = \[([\s\S]*?)\];/;
  const match = toolsData.match(toolDefinitionsRegex);
  
  if (!match) {
    console.error('Could not parse tool definitions from source file');
    process.exit(1);
  }
  
  // Split into individual tool definitions
  const toolDefinitions = [];
  const toolsContent = match[1];
  let braceCount = 0;
  let currentTool = '';

  // Extract individual tool definitions respecting nested objects
  for (let i = 0; i < toolsContent.length; i++) {
    const char = toolsContent[i];
    currentTool += char;
    
    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0 && i < toolsContent.length - 1) {
        if (toolsContent[i+1] === ',') {
          // Include the comma in the current tool definition
          currentTool += toolsContent[i+1];
          i++;
        }
        toolDefinitions.push(currentTool.trim());
        currentTool = '';
      }
    }
  }
  
  // Parse each tool definition
  const tools = [];
  
  for (const toolDef of toolDefinitions) {
    // Extract basic tool info
    const nameMatch = toolDef.match(/name:\s*['"]([^'"]+)['"]/);
    const descMatch = toolDef.match(/description:\s*['"]([^'"]+)['"]/);
    
    if (!nameMatch || !descMatch) continue;
    
    const name = nameMatch[1];
    const description = descMatch[1];
    
    const propertiesContent = extractObjectAfterKey(toolDef, 'properties');
    const parameters = propertiesContent ? parseParameters(propertiesContent, extractRequired(toolDef, true)) : [];
    
    tools.push({
      name,
      description,
      parameters
    });
  }
  
  // Generate markdown content
  let markdown = '# GitLab MCP Server Tools\n\n';
  markdown += 'This document provides details on all available tools in the GitLab MCP server.\n\n';
  markdown += 'Each tool is designed to interact with GitLab APIs, allowing AI assistants to work with repositories, merge requests, issues, CI/CD pipelines, and more.\n\n';
  
  // Categorize each tool exactly once, in priority order
  const categorized = new Set();
  
  function categorize(tools, testFn) {
    return tools.filter(t => {
      if (!categorized.has(t.name) && testFn(t)) {
        categorized.add(t.name);
        return true;
      }
      return false;
    });
  }

  const categories = {
    'Repository Management': categorize(tools, t =>
      t.name.includes('project') ||
      t.name.includes('merge_request') ||
      t.name.includes('repository') ||
      t.name === 'gitlab_search' ||
      t.name === 'gitlab_compare_branches'),
    'Branch Management': categorize(tools, t =>
      t.name.includes('branch') ||
      t.name.includes('protected_branch')),
    'Commits, Tags & Releases': categorize(tools, t =>
      t.name.includes('commit') ||
      t.name.includes('tag') ||
      t.name.includes('release')),
    'Issues & Tracking': categorize(tools, t =>
      t.name.includes('issue') ||
      t.name.includes('label') ||
      t.name.includes('milestone') ||
      t.name.includes('snippet')),
    'Wiki': categorize(tools, t =>
      t.name.includes('wiki')),
    'Pipelines & Jobs': categorize(tools, t =>
      t.name.includes('pipeline') ||
      t.name.includes('job')),
    'CI/CD Variables & Triggers': categorize(tools, t =>
      t.name.includes('trigger') ||
      t.name.includes('cicd')),
    'Runners': categorize(tools, t =>
      t.name.includes('runner')),
    'Environments & Deployments': categorize(tools, t =>
      t.name.includes('environment') ||
      t.name.includes('deployment')),
    'Integrations & Webhooks': categorize(tools, t =>
      t.name.includes('integration') ||
      t.name.includes('webhook') ||
      t.name.includes('slack')),
    'User & Group Management': categorize(tools, t =>
      t.name.includes('user') ||
      t.name.includes('group') ||
      t.name.includes('member'))
  };

  // Catch any uncategorized tools
  const uncategorized = tools.filter(t => !categorized.has(t.name));
  if (uncategorized.length > 0) {
    categories['Other'] = uncategorized;
  }
  
  // Generate table of contents
  markdown += '## Table of Contents\n\n';
  Object.keys(categories).forEach(category => {
    const anchor = generateAnchor(category);
    markdown += `- [${category}](#${anchor})\n`;
  });
  markdown += '\n';
  
  // Generate tool documentation by category
  Object.entries(categories).forEach(([category, categoryTools]) => {
    markdown += `## ${category}\n\n`;
    
    categoryTools.forEach(tool => {
      markdown += `### ${tool.name}\n\n`;
      markdown += `${tool.description}\n\n`;
      
      if (tool.parameters.length > 0) {
        markdown += '**Parameters:**\n\n';
        markdown += '| Name | Type | Required | Description |\n';
        markdown += '| ---- | ---- | -------- | ----------- |\n';
        
        tool.parameters.forEach(param => {
          markdown += `| \`${param.name}\` | \`${param.type}\` | ${param.required ? 'Yes' : 'No'} | ${param.description} |\n`;
        });
        
        markdown += '\n';
      } else {
        markdown += 'This tool does not require any parameters.\n\n';
      }
    });
  });
  
  // Add footer
  markdown += '---\n\n';
  markdown += 'Generated automatically from `src/utils/tools-data.ts`\n';
  
  // Write to TOOLS.md
  fs.writeFileSync(outputPath, markdown);
  console.log(`Successfully generated ${outputPath}`);
  
} catch (error) {
  console.error('Error generating markdown:', error);
  process.exit(1);
}