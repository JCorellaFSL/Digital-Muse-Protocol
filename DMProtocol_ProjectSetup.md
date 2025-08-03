## **Digital Muse Protocol - Project Setup Guide**

### **Purpose**
Get your Digital Muse Protocol project up and running quickly with proper knowledge graph integration and file organization.

---

## **Quick Start (15 Minutes)**

### **Step 1: Create Project Structure**
```bash
# Create your project directory
mkdir "My Novel Project"
cd "My Novel Project"

# Create the basic structure
mkdir -p book/memory
mkdir -p book/characters
mkdir -p book/world
mkdir -p book/plots
mkdir -p book/chapters
mkdir -p protocol/tools
mkdir -p protocol/guides
```

### **Step 2: Choose Your Knowledge Graph Architecture**

#### **Option A: Single Graph (Simple Projects)**
```bash
# Copy the basic MCP configuration
cp mcp_memory_config.json claude_desktop_config.json
```

#### **Option B: Federated Graphs (Complex Projects)** ⭐ Recommended
```bash
# Copy the federated MCP configuration  
cp federated_mcp_config.json claude_desktop_config.json
```

### **Step 3: Initialize Knowledge Graphs**
```bash
# Knowledge graphs will be created automatically on first use
# Location: ./book/memory/[graph_name].json
```

### **Step 4: Copy Protocol Files**
```bash
# Copy core protocol files to your project
cp DMProtocol_CoreMethodology.md protocol/guides/
cp DMProtocol_Templates.md protocol/tools/
cp DMProtocol_Checklists.md protocol/tools/
```

---

## **Detailed Setup Process**

### **Directory Structure Explanation**
```
My Novel Project/
├── 📚 book/                          # Core story content
│   ├── memory/                       # Knowledge graphs (auto-created)
│   │   ├── master_story_graph.json   # Overall story coordination
│   │   ├── character_graph.json      # Character development
│   │   ├── world_graph.json         # World-building details
│   │   ├── plot_graph.json          # Plot events and timelines
│   │   └── narrative_graph.json     # Chapter structure
│   ├── characters/                   # Character markdown files
│   ├── world/                       # World-building markdown files
│   ├── plots/                       # Plot outline markdown files
│   └── chapters/                    # Generated chapters
├── 📋 protocol/                      # Protocol implementation files
│   ├── guides/                      # Phase guides and methodology
│   └── tools/                       # Templates, checklists, QC tools
├── 🔧 config/                        # Configuration files
│   └── claude_desktop_config.json   # MCP server configuration
├── ROADMAP.md                       # Master project roadmap
├── QA_Checklist.md                  # Quality assurance checklist
└── README.md                        # Project overview and status
```

### **Knowledge Graph Configuration**

#### **For Single Graph Setup:**
```json
{
  "mcpServers": {
    "story_memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "./book/memory/story_memory.json"
      },
      "autoapprove": [
        "create_entities", "create_relations", "add_observations",
        "search_nodes", "read_graph"
      ]
    }
  }
}
```

#### **For Federated Graph Setup:**
```json
{
  "mcpServers": {
    "master_story": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": { "MEMORY_FILE_PATH": "./book/memory/master_story_graph.json" }
    },
    "character_memory": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": { "MEMORY_FILE_PATH": "./book/memory/character_graph.json" }
    },
    "world_memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": { "MEMORY_FILE_PATH": "./book/memory/world_graph.json" }
    },
    "plot_memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": { "MEMORY_FILE_PATH": "./book/memory/plot_graph.json" }
    },
    "narrative_memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": { "MEMORY_FILE_PATH": "./book/memory/narrative_graph.json" }
    }
  }
}
```

### **AI Client Configuration**

#### **Claude Desktop Setup**
1. **Locate your config file:**
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Linux**: `~/.config/claude/claude_desktop_config.json`

2. **Copy your chosen configuration** to the config file location

3. **Restart Claude Desktop** - MCP servers will initialize automatically

#### **Cursor Setup** (Alternative)
1. Open Cursor in your project directory
2. Configure MCP integration through Cursor's settings
3. Reference the same knowledge graph files

### **Verification Steps**

#### **Test Knowledge Graph Connection**
Open Claude Desktop and try:
```
"Create a test entity in master_story with name 'project_test' and type 'verification' with observation 'Setup completed successfully'"
```

**Expected Response**: Confirmation that entity was created

#### **Verify File Structure**
Check that these files exist:
```bash
ls book/memory/
# Should show: master_story_graph.json (or story_memory.json for single graph)
```

#### **Test Cross-Domain References** (Federated Only)
```
"Create character entity 'test_character' in character_memory, then reference it in master_story as 'character_graph::test_character'"
```

---

## **Initial Project Configuration**

### **Create Master Roadmap**
```markdown
# [Your Project Name] - Digital Muse Protocol

## Project Overview
- **Genre**: [Your genre]
- **Target Length**: [Word count]
- **Target Audience**: [Reader demographic]
- **Completion Timeline**: [Your deadline]

## Knowledge Graph Architecture
- [X] Single Graph / [ ] Federated System
- **Storage Location**: ./book/memory/
- **MCP Configuration**: [Configuration type used]

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
```

### **Initialize Quality Assurance Checklist**
```markdown
# Quality Assurance Checklist

## Phase Completion Gates
- [ ] Phase 0: All planning documents approved
- [ ] Phase 1: Roadmap and KG architecture validated
- [ ] Phase 2: All character/world files signed off
- [ ] Phase 3: All chapters pass anti-generalization review
- [ ] Phase 4: Beta reader feedback incorporated

## Knowledge Graph Validation
- [ ] All entities have complete observations
- [ ] Cross-references are valid and functional
- [ ] No orphaned entities or broken relations
- [ ] Consistency checks pass across all domains

## Anti-Generalization Standards
- [ ] < 5% generic language in final prose
- [ ] All character actions align with established personality
- [ ] Specific sensory details in scene descriptions
- [ ] Concrete cause-effect relationships in plot events
```

---

## **Integration with Existing Workflow**

### **Version Control Setup**
```bash
# Initialize Git repository
git init
git add .
git commit -m "Initial Digital Muse Protocol setup"

# Create development branch for active writing
git checkout -b development

# .gitignore recommendations
echo "*.tmp" >> .gitignore
echo "*.backup" >> .gitignore
echo ".DS_Store" >> .gitignore
```

### **Backup Strategy**
```bash
# Automated backup script (optional)
# Save as: scripts/backup_project.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/backup_$DATE"
mkdir -p $BACKUP_DIR

cp -r book/ $BACKUP_DIR/
cp ROADMAP.md $BACKUP_DIR/
cp QA_Checklist.md $BACKUP_DIR/
echo "Backup completed: $BACKUP_DIR"
```

### **Daily Workflow Integration**
```markdown
## Daily Writing Session Checklist

### Pre-Session (5 minutes)
- [ ] Review current chapter goals in ROADMAP.md
- [ ] Query relevant knowledge graphs for context
- [ ] Check QA_Checklist.md for any pending issues

### During Session
- [ ] Consult knowledge graphs before writing new content
- [ ] Update knowledge graphs with new story developments
- [ ] Apply anti-generalization techniques in real-time

### Post-Session (5 minutes)
- [ ] Update ROADMAP.md with progress
- [ ] Commit changes to version control
- [ ] Run consistency check across knowledge graphs
```

---

## **Troubleshooting Common Setup Issues**

### **MCP Server Not Connecting**
**Symptoms**: Claude Desktop doesn't recognize knowledge graph commands

**Solutions**:
1. Verify config file location and syntax
2. Restart Claude Desktop completely
3. Check that `npx` is installed and accessible
4. Verify file paths are correct (use forward slashes even on Windows)

### **Knowledge Graph Files Not Created**
**Symptoms**: Memory directory remains empty

**Solutions**:
1. Try a simple entity creation command to trigger initialization
2. Check file permissions on the memory directory
3. Verify the MEMORY_FILE_PATH in configuration is writable

### **Cross-References Not Working** (Federated System)
**Symptoms**: Can't reference entities across different graphs

**Solutions**:
1. Verify all graph servers are running (check Claude Desktop status)
2. Use exact format: `graph_name::entity_name`
3. Ensure entity exists in target graph before referencing

### **Performance Issues**
**Symptoms**: Slow responses from knowledge graph queries

**Solutions**:
1. Consider switching to DuckDB backend for large projects
2. Break down large entities into smaller, focused ones
3. Regular cleanup of unused entities and relations

---

## **Next Steps**

### **Immediate Actions**
1. **Verify Setup**: Test knowledge graph connectivity
2. **Create Initial Roadmap**: Use the template provided
3. **Begin Phase 0**: Start with pre-project planning

### **Optional Enhancements**
1. **Advanced KG Backend**: Upgrade to DuckDB for better performance
2. **Team Collaboration**: Set up shared repository for multi-author projects
3. **Automation Scripts**: Create custom backup and validation scripts

### **Learning Path**
1. **Start Simple**: Use single graph for first project
2. **Practice Basics**: Focus on anti-generalization techniques
3. **Scale Up**: Move to federated system for complex projects
4. **Optimize**: Develop custom templates and workflows

**Your Digital Muse Protocol setup is complete! Ready to begin Phase 0: Pre-Project Planning.**