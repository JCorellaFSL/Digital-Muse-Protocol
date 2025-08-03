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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DigitalMuseProtocolServer {
  constructor() {
    this.server = new Server(
      {
        name: 'digital-muse-protocol',
        version: '1.0.0',
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
                description: 'Type of knowledge graph architecture (default: federated)',
              },
              project_path: {
                type: 'string',
                description: 'Project path for memory file locations (default: ./book/memory/)',
              },
            },
          },
        },
        {
          name: 'get_phase_guide',
          description: 'Get implementation guide for a specific Digital Muse Protocol phase',
          inputSchema: {
            type: 'object',
            properties: {
              phase: {
                type: 'string',
                enum: ['0', '1', '2', '3', '4', 'setup', 'core'],
                description: 'Phase number or guide type',
              },
            },
            required: ['phase'],
          },
        },
        {
          name: 'validate_project_consistency',
          description: 'Check knowledge graph consistency across all domains',
          inputSchema: {
            type: 'object',
            properties: {
              project_path: {
                type: 'string',
                description: 'Path to the project to validate (defaults to current directory)',
              },
            },
          },
        },
      ],
    }));

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'dm://methodology/core',
          name: 'Core Methodology',
          description: 'Digital Muse Protocol core principles and anti-generalization techniques',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://methodology/setup',
          name: 'Project Setup Guide',
          description: 'Complete setup guide for new Digital Muse Protocol projects',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://methodology/kg-integration',
          name: 'Knowledge Graph Integration',
          description: 'Complete guide to using knowledge graphs throughout the protocol',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://templates/character',
          name: 'Character Template',
          description: 'Character development template with knowledge graph integration',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://templates/world',
          name: 'World Template',
          description: 'World building template with knowledge graph integration', 
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://templates/plot',
          name: 'Plot Template',
          description: 'Plot development template with knowledge graph integration',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://templates/all',
          name: 'All Templates',
          description: 'Complete template collection from DMProtocol_Templates.md',
          mimeType: 'text/markdown',
        },
        {
          uri: 'dm://config/mcp-simple',
          name: 'Simple MCP Configuration',
          description: 'MCP configuration for single knowledge graph setup',
          mimeType: 'application/json',
        },
        {
          uri: 'dm://config/mcp-federated',
          name: 'Federated MCP Configuration',
          description: 'MCP configuration for federated knowledge graph setup',
          mimeType: 'application/json',
        },
        {
          uri: 'dm://examples/character-graph',
          name: 'Example Character Graph',
          description: 'Working example of character knowledge graph',
          mimeType: 'application/json',
        },
        {
          uri: 'dm://examples/world-graph',
          name: 'Example World Graph',
          description: 'Working example of world-building knowledge graph',
          mimeType: 'application/json',
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'setup_project_structure':
          return await this.setupProjectStructure(args?.project_path || '.');

        case 'get_character_template':
          return await this.getTemplate('character', args?.format || 'markdown');

        case 'get_world_template':
          return await this.getTemplate('world', args?.format || 'markdown');

        case 'get_plot_template':
          return await this.getTemplate('plot', args?.format || 'markdown');

        case 'get_mcp_config':
          return await this.getMcpConfig(args?.type || 'federated', args?.project_path);

        case 'get_phase_guide':
          return await this.getPhaseGuide(args.phase);

        case 'validate_project_consistency':
          return await this.validateProjectConsistency(args?.project_path || '.');

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      const resourceMap = {
        'dm://methodology/core': 'DMProtocol_CoreMethodology.md',
        'dm://methodology/setup': 'DMProtocol_ProjectSetup.md',
        'dm://methodology/kg-integration': 'DMProtocol_KnowledgeGraph_Integration.md',
        'dm://templates/character': 'character_template_section',
        'dm://templates/world': 'world_template_section',
        'dm://templates/plot': 'plot_template_section',
        'dm://templates/all': 'DMProtocol_Templates.md',
        'dm://config/mcp-simple': 'mcp_memory_config.json',
        'dm://config/mcp-federated': 'federated_mcp_config.json',
        'dm://examples/character-graph': 'example_federated_graphs/character_graph.json',
        'dm://examples/world-graph': 'example_federated_graphs/world_graph.json',
      };

      const resource = resourceMap[uri];
      if (!resource) {
        throw new Error(`Unknown resource: ${uri}`);
      }

      return await this.getResourceContent(resource);
    });
  }

  async setupProjectStructure(projectPath) {
    try {
      const directories = [
        'book/memory',
        'book/characters', 
        'book/world',
        'book/plots',
        'book/chapters',
      ];

      for (const dir of directories) {
        const fullPath = path.join(projectPath, dir);
        await fs.mkdir(fullPath, { recursive: true });
      }

      // Create initial ROADMAP.md
      const roadmapPath = path.join(__dirname, 'roadmap_template.md');
      let roadmapTemplate;
      
      try {
        roadmapTemplate = await fs.readFile(roadmapPath, 'utf-8');
      } catch {
        // Fallback template if file doesn't exist
        roadmapTemplate = `# [Project Name] - Digital Muse Protocol

## Project Parameters
- **Genre**: [Your genre]
- **Target Length**: [Word count]
- **Target Audience**: [Reader demographic]
- **Completion Timeline**: [Your deadline]

## Knowledge Graph Architecture
- [X] Federated System (Complex) / [ ] Single Graph (Simple)
- **Storage Location**: ./book/memory/

## Phase Status
- [ ] Phase 0: Pre-Project Planning
- [ ] Phase 1: Project Initialization  
- [ ] Phase 2: World & Character Building
- [ ] Phase 3: Chapter Generation
- [ ] Phase 4: Quality Assurance

## Success Criteria
- Target word count: [Number]
- Character consistency: 95%+
- Zero world-building contradictions
- Publication-ready prose quality
`;
      }

      await fs.writeFile(path.join(projectPath, 'ROADMAP.md'), roadmapTemplate);

      return {
        content: [
          {
            type: 'text',
            text: `✅ Digital Muse Protocol project structure created successfully!

Directories created:
${directories.map(dir => `- ${dir}/`).join('\n')}

Files created:
- ROADMAP.md (project master plan template)

Next steps:
1. Use 'get_mcp_config' to generate memory server configuration
2. Use template tools to create your first story elements
3. Begin with Phase 0: Pre-Project Planning

Use 'get_phase_guide' with phase '0' to get started!`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Error creating project structure: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async getTemplate(type, format) {
    // Extract template sections from DMProtocol_Templates.md
    const templatesPath = path.join(__dirname, 'DMProtocol_Templates.md');
    
    try {
      const content = await fs.readFile(templatesPath, 'utf-8');
      
      const sections = {
        character: this.extractSection(content, '### **Character Profile Template (Knowledge Graph)**'),
        world: this.extractSection(content, '### **Location Profile Template (Knowledge Graph)**'),
        plot: this.extractSection(content, '### **Plot Event Template (Knowledge Graph)**'),
      };

      const template = sections[type];
      if (!template) {
        throw new Error(`Template type '${type}' not found`);
      }

      return {
        content: [
          {
            type: 'text',
            text: format === 'json' ? JSON.stringify({ template }, null, 2) : template,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Error loading ${type} template: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  extractSection(content, sectionHeader) {
    const startIndex = content.indexOf(sectionHeader);
    if (startIndex === -1) return null;

    const nextSectionIndex = content.indexOf('### **', startIndex + sectionHeader.length);
    const endIndex = nextSectionIndex === -1 ? content.length : nextSectionIndex;

    return content.slice(startIndex, endIndex).trim();
  }

  async getMcpConfig(type, projectPath = './book/memory/') {
    const configs = {
      simple: {
        mcpServers: {
          'story_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: `${projectPath}/story_memory.json`,
            },
            autoapprove: [
              'create_entities',
              'create_relations',
              'add_observations',
              'search_nodes',
              'read_graph',
            ],
          },
        },
      },
      federated: {
        mcpServers: {
          'master_story': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: `${projectPath}/master_story_graph.json`,
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
          'character_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: `${projectPath}/character_graph.json`,
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
          'world_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: `${projectPath}/world_graph.json`,
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
          'plot_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: `${projectPath}/plot_graph.json`,
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
          'narrative_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: `${projectPath}/narrative_graph.json`,
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
        },
      },
    };

    return {
      content: [
        {
          type: 'text',
          text: `# ${type.charAt(0).toUpperCase() + type.slice(1)} MCP Configuration

Copy this configuration to your MCP settings:

\`\`\`json
${JSON.stringify(configs[type], null, 2)}
\`\`\`

**Instructions:**
1. Copy the above JSON configuration
2. Add it to your MCP client settings (merge with existing mcpServers)
3. Restart your MCP client
4. The memory servers will create knowledge graph files automatically in ${projectPath}`,
        },
      ],
    };
  }

  async getPhaseGuide(phase) {
    const phaseFiles = {
      '0': 'DMProtocol_Phase0_PrePlanning.md',
      '1': 'DMProtocol_Phase1_Initialization.md', 
      '2': 'DMProtocol_Phase2_WorldBuilding.md',
      '3': 'DMProtocol_Phase3_ChapterGeneration.md',
      '4': 'DMProtocol_Phase4_QualityAssurance.md',
      'setup': 'DMProtocol_ProjectSetup.md',
      'core': 'DMProtocol_CoreMethodology.md',
    };

    const filename = phaseFiles[phase];
    if (!filename) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Unknown phase: ${phase}. Available phases: 0, 1, 2, 3, 4, setup, core`,
          },
        ],
        isError: true,
      };
    }

    return await this.getResourceContent(filename);
  }

  async getResourceContent(filename) {
    try {
      const filePath = path.join(__dirname, filename);
      const content = await fs.readFile(filePath, 'utf-8');
      
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
            text: `❌ Error reading resource ${filename}: ${error.message}`,
          },
        ],
      };
    }
  }

  async validateProjectConsistency(projectPath) {
    // Basic consistency checking - could be expanded
    try {
      const memoryPath = path.join(projectPath, 'book', 'memory');
      const files = await fs.readdir(memoryPath).catch(() => []);
      
      const knowledgeGraphs = files.filter(f => f.endsWith('.json'));
      
      if (knowledgeGraphs.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `⚠️ No knowledge graph files found in ${memoryPath}. 

Set up memory servers first using 'get_mcp_config' tool.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: `✅ Project consistency check:

Found knowledge graphs:
${knowledgeGraphs.map(f => `- ${f}`).join('\n')}

📊 Basic validation complete. For detailed consistency checking, ensure all knowledge graphs are populated with story elements.

Advanced validation features coming soon!`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Error validating project: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new DigitalMuseProtocolServer();
server.run().catch(console.error);