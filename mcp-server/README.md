# Digital Muse Protocol MCP Server

An MCP server that provides remote access to the Digital Muse Protocol methodology, templates, and tools without cluttering individual projects with protocol files.

## Features

### 🛠️ Tools
- **`setup_project_structure`** - Create the complete Digital Muse Protocol directory structure
- **`get_character_template`** - Get character development templates with KG integration
- **`get_world_template`** - Get world building templates with KG integration  
- **`get_plot_template`** - Get plot development templates with KG integration
- **`get_mcp_config`** - Generate MCP configurations for memory servers
- **`validate_project_consistency`** - Check knowledge graph consistency (coming soon)

### 📚 Resources
- **Core Methodology** - Anti-generalization principles and techniques
- **Setup Guides** - Project initialization and configuration
- **Templates** - Ready-to-use character, world, and plot templates
- **MCP Configurations** - Both simple and federated architectures

## Installation & Usage

### Via NPX (Recommended)
```json
{
  "mcpServers": {
    "digital-muse-protocol": {
      "command": "npx",
      "args": ["-y", "@digital-muse-protocol/mcp-server"]
    }
  }
}
```

### Local Development
```bash
cd mcp-server
npm install
npm start
```

## Quick Start

1. **Configure MCP** with the server above
2. **Create project structure**:
   ```
   Use tool: setup_project_structure
   ```

3. **Get MCP configuration for memory servers**:
   ```
   Use tool: get_mcp_config with type "federated"
   ```

4. **Add memory servers to your MCP config** and restart
5. **Start writing** with persistent knowledge graphs!

## Architecture

This MCP server provides **remote access** to the Digital Muse Protocol without requiring users to copy protocol files into their projects. Users get:

- **Clean Projects**: Only their story content is local
- **Always Updated**: Protocol improvements delivered automatically
- **Remote Templates**: Access all templates via MCP tools
- **Configuration Generation**: Automatic MCP config generation

## Example Workflow

```javascript
// 1. Setup project
"Use setup_project_structure tool to create Digital Muse Protocol directories"

// 2. Get federated MCP config  
"Use get_mcp_config tool with type 'federated'"

// 3. Get character template
"Use get_character_template tool to create first character"

// 4. Configure memory servers (add output from step 2 to MCP config)
// 5. Start creating knowledge graph entities using the templates
```

## Benefits

### For Users
- ✅ **No File Copying** - Access protocol remotely
- ✅ **Clean Projects** - Only story content is local  
- ✅ **Always Current** - Get updates automatically
- ✅ **Easy Setup** - Tools handle configuration

### For Protocol Development
- ✅ **Centralized Distribution** - One source of truth
- ✅ **Usage Analytics** - See how protocol is being used
- ✅ **Easy Updates** - Improve once, everyone benefits
- ✅ **Version Control** - Users can pin to specific versions

## Repository Structure

This MCP server is part of the [Digital Muse Protocol](https://github.com/JCorellaFSL/Digital-Muse-Protocol) repository:

```
Digital-Muse-Protocol/
├── mcp-server/                    # This MCP server
│   ├── digital-muse-protocol-server.js
│   ├── package.json
│   └── README.md
├── DMProtocol_*.md               # Protocol documentation
├── federated_mcp_config.json    # Example configurations  
└── example_federated_graphs/    # Working examples
```

## License

MIT License - see the main repository [LICENSE](../LICENSE) for details.