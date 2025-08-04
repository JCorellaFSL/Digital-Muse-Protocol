#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle command line arguments
if (process.argv.includes('--version')) {
  console.log('1.1.0');
  process.exit(0);
}

if (process.argv.includes('--help')) {
  console.log('Digital Muse Protocol MCP Server v1.1.0');
  console.log('Usage: digital-muse-protocol [options]');
  console.log('Options:');
  console.log('  --version    Show version number');
  console.log('  --help       Show this help message');
  process.exit(0);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration and constants
const CONFIG = {
  SERVER_NAME: 'digital-muse-protocol',
  SERVER_VERSION: '1.1.0',
  DIRECTORIES: {
    DOCS: 'docs',
    PHASES: 'phases', 
    TOOLS: 'tools',
    TEMPLATES: 'templates',
    TECHNICAL: 'technical',
  },
};

// File path mappings for new directory structure
const FILE_PATHS = {
  // Core methodology files
  CORE_METHODOLOGY: 'docs/DMProtocol_CoreMethodology.md',
  PROJECT_SETUP: 'docs/DMProtocol_ProjectSetup.md',
  KG_INTEGRATION: 'docs/DMProtocol_KnowledgeGraph_Integration.md',
  KG_SETUP: 'docs/KG_SETUP.md',
  KG_ADVANCED: 'docs/KG_ADVANCED.md',
  
  // Phase guides
  PHASE_0: 'phases/DMProtocol_Phase0_PrePlanning.md',
  PHASE_1: 'phases/DMProtocol_Phase1_Initialization.md',
  PHASE_2: 'phases/DMProtocol_Phase2_WorldBuilding.md',
  PHASE_3: 'phases/DMProtocol_Phase3_ChapterGeneration.md',
  PHASE_4: 'phases/Phase4_QualityAssurance.md',
  
  // Tools and templates
  TEMPLATES: 'templates/DMProtocol_Templates.md',
  CHECKLISTS: 'tools/DMProtocol_Checklists.md',
  QUALITY_CONTROL: 'tools/QualityControl_Guide.md',
  TROUBLESHOOTING: 'tools/DMProtocol_Troubleshooting.md',
  
  // Technical files
  FEDERATED_CONFIG: 'technical/federated_mcp_config.json',
  ROADMAP_TEMPLATE: 'templates/roadmap_template.md',
};

// Utility functions
class FileUtils {
  static async safeReadFile(filePath, fallback = null) {
    try {
      const fullPath = path.join(__dirname, filePath);
      return await fs.readFile(fullPath, 'utf-8');
    } catch (error) {
      if (fallback) {
        return fallback;
      }
      throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
  }

  static async ensureDirectory(dirPath) {
    try {
      await fs.mkdir(dirPath, { recursive: true });
      return true;
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${error.message}`);
    }
  }

  static createSuccessResponse(content) {
    return {
      content: [{ type: 'text', text: content }],
    };
  }

  static createErrorResponse(message, details = '') {
    const fullMessage = details ? `❌ ${message}\n\n${details}` : `❌ ${message}`;
    return {
      content: [{ type: 'text', text: fullMessage }],
      isError: true,
    };
  }
}

// Tool handlers - modular approach
class ToolHandlers {
  static async setupProjectStructure(projectPath = '.') {
    try {
      const directories = [
        'book/memory',
        'book/characters',
        'book/world', 
        'book/plots',
        'book/chapters',
      ];

      // Create directory structure
      for (const dir of directories) {
        const fullPath = path.join(projectPath, dir);
        await FileUtils.ensureDirectory(fullPath);
      }

      // Create initial ROADMAP.md from template
      const roadmapTemplate = await FileUtils.safeReadFile(
        FILE_PATHS.ROADMAP_TEMPLATE,
        this.getDefaultRoadmapTemplate()
      );

      const roadmapPath = path.join(projectPath, 'ROADMAP.md');
      await fs.writeFile(roadmapPath, roadmapTemplate);

      return FileUtils.createSuccessResponse(
        `✅ Digital Muse Protocol project structure created successfully!\n\n` +
        `📁 Created directories:\n${directories.map(d => `- ${d}`).join('\n')}\n\n` +
        `📄 Created files:\n- ROADMAP.md (project master plan)\n\n` +
        `🚀 Next steps:\n` +
        `1. Edit ROADMAP.md with your project details\n` +
        `2. Use 'get_mcp_config' to set up knowledge graph memory\n` +
        `3. Begin with Phase 0 using 'get_phase_guide' with phase '0'`
      );
    } catch (error) {
      return FileUtils.createErrorResponse(
        'Failed to create project structure',
        error.message
      );
    }
  }

  static async getTemplate(templateType, format = 'markdown') {
    try {
      if (!['character', 'world', 'plot'].includes(templateType)) {
        return FileUtils.createErrorResponse(
          `Invalid template type: ${templateType}`,
          'Available types: character, world, plot'
        );
      }

      const templates = await FileUtils.safeReadFile(FILE_PATHS.TEMPLATES);
      const templateSection = this.extractTemplateSection(templates, templateType);

      if (format === 'json') {
        // Convert markdown template to JSON structure
        return FileUtils.createSuccessResponse(
          this.convertTemplateToJson(templateSection, templateType)
        );
      }

      return FileUtils.createSuccessResponse(templateSection);
    } catch (error) {
      return FileUtils.createErrorResponse(
        `Failed to get ${templateType} template`,
        error.message
      );
    }
  }

  static async getMcpConfig(type = 'federated', projectPath = '.') {
    try {
      if (type === 'simple') {
        return FileUtils.createSuccessResponse(this.getSimpleMcpConfig(projectPath));
      } else if (type === 'federated') {
        const config = await FileUtils.safeReadFile(
          FILE_PATHS.FEDERATED_CONFIG,
          this.getDefaultFederatedConfig(projectPath)
        );
        return FileUtils.createSuccessResponse(config);
      } else {
        return FileUtils.createErrorResponse(
          `Invalid MCP config type: ${type}`,
          'Available types: simple, federated'
        );
      }
    } catch (error) {
      return FileUtils.createErrorResponse(
        'Failed to generate MCP configuration',
        error.message
      );
    }
  }

  static async getPhaseGuide(phase) {
    try {
      const phaseFiles = {
        '0': FILE_PATHS.PHASE_0,
        '1': FILE_PATHS.PHASE_1,
        '2': FILE_PATHS.PHASE_2,
        '3': FILE_PATHS.PHASE_3,
        '4': FILE_PATHS.PHASE_4,
        'setup': FILE_PATHS.PROJECT_SETUP,
        'core': FILE_PATHS.CORE_METHODOLOGY,
        'kg-setup': FILE_PATHS.KG_SETUP,
        'kg-advanced': FILE_PATHS.KG_ADVANCED,
      };

      const filePath = phaseFiles[phase];
      if (!filePath) {
        return FileUtils.createErrorResponse(
          `Unknown phase: ${phase}`,
          `Available phases: ${Object.keys(phaseFiles).join(', ')}`
        );
      }

      const content = await FileUtils.safeReadFile(filePath);
      return FileUtils.createSuccessResponse(content);
    } catch (error) {
      return FileUtils.createErrorResponse(
        `Failed to get phase ${phase} guide`,
        error.message
      );
    }
  }

  static async validateProjectConsistency(projectPath = '.') {
    try {
      const validationResults = [];
      
      // Check project structure
      const requiredDirs = ['book/memory', 'book/characters', 'book/world', 'book/plots'];
      const missingDirs = [];
      
      for (const dir of requiredDirs) {
        try {
          await fs.access(path.join(projectPath, dir));
        } catch {
          missingDirs.push(dir);
        }
      }

      if (missingDirs.length > 0) {
        validationResults.push(`⚠️ Missing directories: ${missingDirs.join(', ')}`);
      }

      // Check knowledge graphs
      const memoryPath = path.join(projectPath, 'book', 'memory');
      const files = await fs.readdir(memoryPath).catch(() => []);
      const knowledgeGraphs = files.filter(f => f.endsWith('.json'));

      if (knowledgeGraphs.length === 0) {
        validationResults.push(`⚠️ No knowledge graph files found in ${memoryPath}`);
        validationResults.push(`💡 Set up memory servers using 'get_mcp_config' tool`);
      } else {
        validationResults.push(`✅ Found ${knowledgeGraphs.length} knowledge graph(s):`);
        validationResults.push(...knowledgeGraphs.map(f => `  - ${f}`));
      }

      // Check key files
      const keyFiles = ['ROADMAP.md'];
      for (const file of keyFiles) {
        try {
          await fs.access(path.join(projectPath, file));
          validationResults.push(`✅ ${file} exists`);
        } catch {
          validationResults.push(`⚠️ Missing ${file} - run 'setup_project_structure' first`);
        }
      }

      return FileUtils.createSuccessResponse(
        `🔍 Project Consistency Validation\n\n` +
        validationResults.join('\n') +
        `\n\n📊 Validation complete. Address any warnings above for optimal setup.`
      );
    } catch (error) {
      return FileUtils.createErrorResponse(
        'Failed to validate project consistency',
        error.message
      );
    }
  }

  // Helper methods
  static getDefaultRoadmapTemplate() {
    return `# [Project Name] - Digital Muse Protocol

## Project Parameters
- **Genre**: [Your genre]
- **Target Audience**: [Your target readers]
- **Estimated Length**: [Target word count]
- **Timeline**: [Project completion target]

## Story Concept
[Brief 2-3 sentence story summary]

## Success Metrics
- [ ] Compelling, consistent characters
- [ ] Rich, believable world
- [ ] Engaging plot with clear stakes
- [ ] Publication-ready quality

## Phase Completion Tracking
- [ ] Phase 0: Pre-Planning
- [ ] Phase 1: Initialization  
- [ ] Phase 2: World Building
- [ ] Phase 3: Chapter Generation
- [ ] Phase 4: Quality Assurance

## Notes
[Project-specific notes and considerations]
`;
  }

  static extractTemplateSection(templates, type) {
    const markers = {
      character: { start: '## Character Development Template', end: '## World Building Template' },
      world: { start: '## World Building Template', end: '## Plot Development Template' },
      plot: { start: '## Plot Development Template', end: '## Quality Control Templates' }
    };

    const marker = markers[type];
    if (!marker) return '';

    const startIndex = templates.indexOf(marker.start);
    if (startIndex === -1) return `Template for ${type} not found`;

    const endIndex = templates.indexOf(marker.end, startIndex);
    const section = endIndex === -1 
      ? templates.slice(startIndex)
      : templates.slice(startIndex, endIndex);

    return section.trim();
  }

  static convertTemplateToJson(templateContent, type) {
    // Basic conversion to JSON structure
    const jsonTemplate = {
      type: type,
      structure: {},
      instructions: `Complete ${type} template following Digital Muse Protocol guidelines`,
    };

    // Extract sections from markdown (simplified)
    const sections = templateContent.split('###').slice(1);
    sections.forEach(section => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      jsonTemplate.structure[title] = content;
    });

    return JSON.stringify(jsonTemplate, null, 2);
  }

  static getSimpleMcpConfig(projectPath) {
    return JSON.stringify({
      mcpServers: {
        dm_protocol_memory: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-memory'],
          env: {
            MEMORY_FILE_PATH: `${projectPath}/book/memory/dm_protocol_memory.json`
          },
          autoapprove: [
            'create_entities', 'create_relations', 'add_observations',
            'delete_entities', 'delete_observations', 'delete_relations',
            'read_graph', 'search_nodes', 'open_nodes'
          ]
        }
      }
    }, null, 2);
  }

  static getDefaultFederatedConfig(projectPath) {
    const servers = ['master_story', 'character_memory', 'world_memory', 'plot_memory', 'narrative_memory'];
    const config = { mcpServers: {} };

    servers.forEach(server => {
      config.mcpServers[server] = {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-memory'],
        env: {
          MEMORY_FILE_PATH: `${projectPath}/book/memory/${server.replace('_memory', '_graph')}.json`
        },
        autoapprove: [
          'create_entities', 'create_relations', 'add_observations',
          'delete_entities', 'delete_observations', 'delete_relations',
          'read_graph', 'search_nodes', 'open_nodes'
        ]
      };
    });

    return JSON.stringify(config, null, 2);
  }
}

// Main server class - now focused on setup and routing
class DigitalMuseProtocolServer {
  constructor() {
    this.server = new Server(
      {
        name: CONFIG.SERVER_NAME,
        version: CONFIG.SERVER_VERSION,
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.setupToolHandlers();
    this.setupResourceHandlers();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'setup_project_structure',
          description: 'Create the Digital Muse Protocol directory structure for a new project',
          inputSchema: {
            type: 'object',
            properties: {
              project_path: {
                type: 'string',
                description: 'Path where to create the project structure (defaults to current directory)',
              },
            },
          },
        },
        {
          name: 'get_character_template',
          description: 'Get the character development template with knowledge graph integration',
          inputSchema: {
            type: 'object',
            properties: {
              format: {
                type: 'string',
                enum: ['markdown', 'json'],
                description: 'Format for the template (default: markdown)',
              },
            },
          },
        },
        {
          name: 'get_world_template',
          description: 'Get the world building template with knowledge graph integration',
          inputSchema: {
            type: 'object',
            properties: {
              format: {
                type: 'string',
                enum: ['markdown', 'json'],
                description: 'Format for the template (default: markdown)',
              },
            },
          },
        },
        {
          name: 'get_plot_template',
          description: 'Get the plot development template with knowledge graph integration',
          inputSchema: {
            type: 'object',
            properties: {
              format: {
                type: 'string',
                enum: ['markdown', 'json'],
                description: 'Format for the template (default: markdown)',
              },
            },
          },
        },
        {
          name: 'get_mcp_config',
          description: 'Generate MCP configuration for knowledge graph memory servers',
          inputSchema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['simple', 'federated'],
                description: 'Type of configuration (simple=single graph, federated=multiple specialized graphs)',
              },
              project_path: {
                type: 'string',
                description: 'Path to the project directory (defaults to current directory)',
              },
            },
          },
        },
        {
          name: 'get_phase_guide',
          description: 'Get implementation guide for a specific phase or core document',
          inputSchema: {
            type: 'object',
            properties: {
              phase: {
                type: 'string',
                enum: ['0', '1', '2', '3', '4', 'setup', 'core', 'kg-setup', 'kg-advanced'],
                description: 'Phase number or guide type',
              },
            },
            required: ['phase'],
          },
        },
        {
          name: 'validate_project_consistency',
          description: 'Validate project structure and consistency',
          inputSchema: {
            type: 'object',
            properties: {
              project_path: {
                type: 'string',
                description: 'Path to the project directory (defaults to current directory)',
              },
            },
          },
        },
      ],
    }));

    // Handle tool calls with improved error handling
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params;

        switch (name) {
          case 'setup_project_structure':
            return await ToolHandlers.setupProjectStructure(args?.project_path);

          case 'get_character_template':
            return await ToolHandlers.getTemplate('character', args?.format);

          case 'get_world_template':
            return await ToolHandlers.getTemplate('world', args?.format);

          case 'get_plot_template':
            return await ToolHandlers.getTemplate('plot', args?.format);

          case 'get_mcp_config':
            return await ToolHandlers.getMcpConfig(args?.type, args?.project_path);

          case 'get_phase_guide':
            return await ToolHandlers.getPhaseGuide(args?.phase);

          case 'validate_project_consistency':
            return await ToolHandlers.validateProjectConsistency(args?.project_path);

          default:
            return FileUtils.createErrorResponse(
              `Unknown tool: ${name}`,
              `Available tools: setup_project_structure, get_character_template, get_world_template, get_plot_template, get_mcp_config, get_phase_guide, validate_project_consistency`
            );
        }
      } catch (error) {
        return FileUtils.createErrorResponse(
          'Tool execution failed',
          error.message
        );
      }
    });
  }

  setupResourceHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'dm://methodology/core',
          name: 'Core Methodology',
          description: 'Digital Muse Protocol core principles and philosophy',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://methodology/setup',
          name: 'Project Setup Guide',
          description: '15-minute setup guide for new projects',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://methodology/kg-setup',
          name: 'Knowledge Graph Setup',
          description: 'Essential guide for implementing persistent memory',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://methodology/kg-advanced',
          name: 'Advanced Knowledge Graph Architecture',
          description: 'Federated multi-graph system for complex projects',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://templates/all',
          name: 'All Templates',
          description: 'Complete template collection for characters, world, and plot',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://tools/quality-control',
          name: 'Quality Control Guide',
          description: 'Systematic consistency validation procedures',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://tools/checklists',
          name: 'Phase Checklists',
          description: 'Comprehensive checklists for each phase and quality gates',
          mimeType: 'text/markdown',
        },
      ],
    }));

    // Handle resource reads with updated paths
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      try {
        const { uri } = request.params;

        const resourceMap = {
          'dm://methodology/core': FILE_PATHS.CORE_METHODOLOGY,
          'dm://methodology/setup': FILE_PATHS.PROJECT_SETUP,
          'dm://methodology/kg-integration': FILE_PATHS.KG_INTEGRATION,
          'dm://methodology/kg-setup': FILE_PATHS.KG_SETUP,
          'dm://methodology/kg-advanced': FILE_PATHS.KG_ADVANCED,
          'dm://templates/all': FILE_PATHS.TEMPLATES,
          'dm://tools/quality-control': FILE_PATHS.QUALITY_CONTROL,
          'dm://tools/checklists': FILE_PATHS.CHECKLISTS,
          'dm://tools/troubleshooting': FILE_PATHS.TROUBLESHOOTING,
          'dm://config/federated': FILE_PATHS.FEDERATED_CONFIG,
        };

        const filePath = resourceMap[uri];
        if (!filePath) {
          return {
            contents: [
              {
                type: 'text',
                text: `❌ Unknown resource: ${uri}\n\nAvailable resources:\n${Object.keys(resourceMap).join('\n')}`,
              },
            ],
            isError: true,
          };
        }

        const content = await FileUtils.safeReadFile(filePath);
        return {
          contents: [
            {
              type: 'text',
              text: content,
            },
          ],
        };
      } catch (error) {
        return {
          contents: [
            {
              type: 'text',
              text: `❌ Error reading resource: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    try {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
    } catch (error) {
      console.error('Failed to start Digital Muse Protocol server:', error);
      process.exit(1);
    }
  }
}

// Start the server
const server = new DigitalMuseProtocolServer();
server.run().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});