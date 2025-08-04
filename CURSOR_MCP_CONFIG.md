# Digital Muse Protocol - Cursor MCP Configuration

## ⚡ Quick Setup for Cursor

Copy and paste this configuration into your Cursor `mcp.json` file:

```json
{
  "mcpServers": {
    "digital-muse-protocol": {
      "command": "npx",
      "args": [
        "github:JCorellaFSL/Digital-Muse-Protocol"
      ]
    }
  }
}
```

## 🔧 Alternative Configuration Methods

### Method 1: Direct GitHub NPX (Recommended)
```json
{
  "mcpServers": {
    "digital-muse-protocol": {
      "command": "npx",
      "args": ["github:JCorellaFSL/Digital-Muse-Protocol"]
    }
  }
}
```

### Method 2: Clone and Local Reference  
If the above doesn't work, clone the repository and reference it locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/JCorellaFSL/Digital-Muse-Protocol.git
   cd Digital-Muse-Protocol
   npm install
   ```

2. Use local path in `mcp.json`:
   ```json
   {
     "mcpServers": {
       "digital-muse-protocol": {
         "command": "node",
         "args": ["/path/to/Digital-Muse-Protocol/server.js"],
         "cwd": "/path/to/Digital-Muse-Protocol"
       }
     }
   }
   ```

### Method 3: Global Installation
```bash
npm install -g github:JCorellaFSL/Digital-Muse-Protocol
```

Then in `mcp.json`:
```json
{
  "mcpServers": {
    "digital-muse-protocol": {
      "command": "digital-muse-protocol"
    }
  }
}
```

## 🎯 Verify Installation

After configuration, you should see "digital-muse-protocol" in your MCP Tools panel with available tools:
- setup_project_structure
- get_character_template
- get_mcp_config
- get_phase_guide
- validate_project_consistency

## 🔍 Troubleshooting

1. **"Loading tools" stays yellow**: Try restarting Cursor after adding the configuration
2. **Command not found**: Ensure you have Node.js 18+ installed
3. **Permission errors**: On Unix systems, make sure `server.js` is executable: `chmod +x server.js`

## 📚 Usage

Once loaded, you can:
- Ask: "Set up a new Digital Muse project structure"
- Ask: "Get the character template" 
- Ask: "Show me Phase 1 guide"
- Ask: "Validate my project consistency"
- And more!

The protocol provides comprehensive AI-assisted fiction generation with persistent memory via knowledge graphs.