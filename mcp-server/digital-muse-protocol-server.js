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
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'setup_project_structure':
          return await this.setupProjectStructure(args?.project_path || '.');

        case 'get_character_template':
          return await this.getCharacterTemplate(args?.format || 'markdown');

        case 'get_world_template':
          return await this.getWorldTemplate(args?.format || 'markdown');

        case 'get_plot_template':
          return await this.getPlotTemplate(args?.format || 'markdown');

        case 'validate_project_consistency':
          return await this.validateProjectConsistency(args?.project_path || '.');

        case 'get_mcp_config':
          return await this.getMcpConfig(args?.type || 'federated');

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      switch (uri) {
        case 'dm://methodology/core':
          return await this.getResource('core_methodology');

        case 'dm://methodology/setup':
          return await this.getResource('project_setup');

        case 'dm://templates/character':
          return await this.getResource('character_template');

        case 'dm://templates/world':
          return await this.getResource('world_template');

        case 'dm://templates/plot':
          return await this.getResource('plot_template');

        case 'dm://config/mcp-simple':
          return await this.getResource('mcp_simple_config');

        case 'dm://config/mcp-federated':
          return await this.getResource('mcp_federated_config');

        default:
          throw new Error(`Unknown resource: ${uri}`);
      }
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

      // Create initial project files
      const roadmapTemplate = `# [Project Name] - Digital Muse Protocol

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

      await fs.writeFile(path.join(projectPath, 'ROADMAP.md'), roadmapTemplate);

      return {
        content: [
          {
            type: 'text',
            text: `✅ Digital Muse Protocol project structure created successfully!

Directories created:
- book/memory/ (for knowledge graphs)
- book/characters/ (for character files)
- book/world/ (for world-building files)
- book/plots/ (for plot outlines)
- book/chapters/ (for generated chapters)

Files created:
- ROADMAP.md (project master plan template)

Next steps:
1. Configure MCP memory servers using 'get_mcp_config'
2. Use templates to create your first story elements
3. Begin with Phase 0: Pre-Project Planning`,
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

  async getCharacterTemplate(format) {
    const template = `## Character: [Character_Name] - Knowledge Graph Template

### Core Identity
\`\`\`javascript
// Character Entity Creation
"Create entity '[Character_Name]' in character_memory with type '[character_role]'"

// Core Identity
"Add observations to [Character_Name]: [
  'Age: [X], occupation: [specific job title]',
  'Fatal flaw: [specific psychological weakness that drives conflict]',
  'Core motivation: [what they want more than anything]',
  'Physical appearance: [specific, memorable details]',
  'Voice pattern: [how they speak - vocabulary, rhythm, verbal tics]'
]"
\`\`\`

### Character Arc Framework
\`\`\`javascript
"Add observations to [Character_Name]: [
  'Starting state: [who they are at story beginning]',
  'Character arc: [starting_state] → [transformation] → [ending_state]',
  'Arc catalyst: [what forces the change]',
  'Internal conflict: [psychological struggle throughout story]'
]"
\`\`\`

### Cross-Domain Integration
\`\`\`javascript
// Relationship Network
"Create relations: [Character_Name] → [relationship_type] → [Other_Character]"
"Create relations: [Character_Name] → [lives_in/works_at] → world_graph::[Location]"

// Cross-Domain References
"Add observation to [Character_Name]: 'Referenced in master: master_story::[relevant_act]'"
"Add observation to [Character_Name]: 'Key plot involvement: plot_graph::[major_event]'"
\`\`\`

### Consistency Checklist
- [ ] All dialogue reflects established voice pattern
- [ ] Actions align with established personality traits  
- [ ] Reactions consistent with established fatal flaw
- [ ] Motivation drives all major character decisions
- [ ] Physical descriptions match across all chapters
- [ ] Character growth follows logical progression`;

    return {
      content: [
        {
          type: 'text',
          text: format === 'json' ? JSON.stringify({ template }, null, 2) : template,
        },
      ],
    };
  }

  async getWorldTemplate(format) {
    const template = `## Location: [Location_Name] - Knowledge Graph Template

### Physical Description
\`\`\`javascript
// Location Entity Creation
"Create entity '[Location_Name]' in world_memory with type '[location_type]'"

// Physical Description
"Add observations to [Location_Name]: [
  'Physical structure: [architecture, layout, notable features]',
  'Atmosphere: [mood, lighting, sounds, smells]',
  'Function: [what happens here, who uses it]',
  'Historical significance: [past events, cultural importance]',
  'Current state: [condition, occupancy, activity level]'
]"
\`\`\`

### World Rules Integration
\`\`\`javascript
"Add observations to [Location_Name]: [
  'Technology level: [what tech exists here]',
  'Social rules: [customs, laws, behavioral expectations]',
  'Physical laws: [any special physics, magic systems, etc.]',
  'Access restrictions: [who can enter, security measures]'
]"
\`\`\`

### Cross-Domain Integration
\`\`\`javascript
"Create relations: [Location_Name] → located_in → [Larger_Location]"
"Create relations: character_graph::[Character] → lives_in/works_at → [Location_Name]"
"Add observation to [Location_Name]: 'Featured in: plot_graph::[relevant_events]'"
\`\`\``;

    return {
      content: [
        {
          type: 'text',
          text: format === 'json' ? JSON.stringify({ template }, null, 2) : template,
        },
      ],
    };
  }

  async getPlotTemplate(format) {
    const template = `## Plot Event: [Event_Name] - Knowledge Graph Template

### Event Details
\`\`\`javascript
// Event Entity Creation
"Create entity '[Event_Name]' in plot_memory with type '[event_type]'"

// Event Details
"Add observations to [Event_Name]: [
  'Trigger: [what causes this event to happen]',
  'Key participants: [who is involved and their roles]', 
  'Location: world_graph::[where this happens]',
  'Stakes: [what characters stand to gain/lose]',
  'Outcome: [what changes as a result of this event]'
]"
\`\`\`

### Causality Chain
\`\`\`javascript
"Create relations: [Previous_Event] → leads_to → [Event_Name]"
"Create relations: [Event_Name] → causes → [Consequence_Event]"
\`\`\`

### Character Impact
\`\`\`javascript
"Create relations: [Event_Name] → involves → character_graph::[Character]"
"Add observation to [Event_Name]: 'Character impact: [how this changes involved characters]'"
\`\`\``;

    return {
      content: [
        {
          type: 'text',
          text: format === 'json' ? JSON.stringify({ template }, null, 2) : template,
        },
      ],
    };
  }

  async getMcpConfig(type) {
    const configs = {
      simple: {
        mcpServers: {
          'story_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: './book/memory/story_memory.json',
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
              MEMORY_FILE_PATH: './book/memory/master_story_graph.json',
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
          'character_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: './book/memory/character_graph.json',
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
          'world_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: './book/memory/world_graph.json',
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
          'plot_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: './book/memory/plot_graph.json',
            },
            autoapprove: ['create_entities', 'create_relations', 'add_observations', 'search_nodes', 'read_graph'],
          },
          'narrative_memory': {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-memory'],
            env: {
              MEMORY_FILE_PATH: './book/memory/narrative_graph.json',
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
          text: JSON.stringify(configs[type], null, 2),
        },
      ],
    };
  }

  async validateProjectConsistency(projectPath) {
    // This would implement consistency checking logic
    return {
      content: [
        {
          type: 'text',
          text: 'Project consistency validation would be implemented here - checking cross-references, character consistency, world rules, etc.',
        },
      ],
    };
  }

  async getResource(resourceType) {
    // This would fetch the actual content from the GitHub repository or local cache
    return {
      contents: [
        {
          type: 'text',
          text: `Resource content for ${resourceType} would be fetched from the Digital Muse Protocol repository`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new DigitalMuseProtocolServer();
server.run().catch(console.error);