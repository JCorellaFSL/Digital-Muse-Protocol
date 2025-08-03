## **Local Knowledge Graph Setup for Digital Muse Protocol**

### **Quick Setup Commands**

1. **Create the local memory directory:**
   ```bash
   mkdir -p ./book/memory
   ```

2. **Copy the MCP configuration:**
   ```bash
   # Copy the provided mcp_memory_config.json to your Claude Desktop config location
   # Windows: %APPDATA%\Claude\claude_desktop_config.json
   # macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
   # Linux: ~/.config/claude/claude_desktop_config.json
   ```

3. **Start Claude Desktop** - The MCP server will automatically:
   - Install the memory server package if needed
   - Create `./book/memory/dm_protocol_memory.json` on first use
   - Initialize an empty knowledge graph database

### **Verification**

After setup, you should see:
```
Digital Muse Protocol/
├── DMProtocol_overview.md
├── DMProtocol_KnowledgeGraph_Implementation.md
├── mcp_memory_config.json
└── book/
    └── memory/
        └── dm_protocol_memory.json  # ← Created automatically
```

### **Test the Connection**

In Claude Desktop, try:
```
"Create an entity for a character named 'test_character' with type 'protagonist' and observation 'this is a test character'"
```

If successful, Claude will respond confirming the entity creation, and you'll see the data in `./book/memory/dm_protocol_memory.json`.

### **Database Portability**

**Benefits of Local Storage:**
- ✅ **Version Control**: Memory database is part of your Git repository
- ✅ **Backup**: Included in project backups automatically  
- ✅ **Portability**: Move entire project with memory intact
- ✅ **Collaboration**: Share knowledge graph with team members
- ✅ **Offline**: No external database dependencies

**File Contents Example:**
```json
{
  "entities": [
    {
      "name": "protagonist_sarah",
      "entityType": "character",
      "observations": [
        "Age 32, cybersecurity expert",
        "Fatal flaw: trusts technology over people"
      ]
    }
  ],
  "relations": [
    {
      "from": "protagonist_sarah",
      "to": "neo_tokyo_2087",
      "relationType": "lives_in"
    }
  ]
}
```

### **Switching Storage Backends**

**For Better Performance (Large Projects):**
```json
{
  "dm_protocol_memory": {
    "command": "npx",
    "args": ["-y", "@IzumiSy/mcp-duckdb-memory-server"],
    "env": {
      "MEMORY_FILE_PATH": "./book/memory/dm_protocol_memory.db"
    }
  }
}
```
Creates a DuckDB file instead of JSON (faster queries, better for 100+ entities)

**For Custom Paths:**
```json
{
  "dm_protocol_memory": {
    "command": "npx", 
    "args": ["-y", "mcp-knowledge-graph", "--memory-path", "./book/memory/story_graph.jsonl"]
  }
}
```

### **Git Integration**

Add to your `.gitignore` if you want to exclude the database:
```
# Uncomment to exclude knowledge graph from version control
# book/memory/dm_protocol_memory.json
```

**Recommendation**: Include the memory file in version control for full project reproducibility.