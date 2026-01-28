# 部署指南

## 方法1：使用GitHub Personal Access Token（推荐）

### 1. 生成Token
- 访问：https://github.com/settings/tokens
- 点击"Generate new token" → "Generate new token (classic)"
- 勾选`repo`权限
- 点击"Generate token"
- 复制生成的token（只显示一次）

### 2. 推送代码
```bash
cd /Users/citrus/Documents/person-study/code/PowerMaintenanceSystem
git remote set-url origin https://YOUR_TOKEN@github.com/AI-Eleven-Three/PowerMaintenanceSystem.git
git push origin main
```

### 3. 自动部署
推送成功后，GitHub Actions会自动部署到GitHub Pages

## 方法2：手动部署

### 1. 构建项目
```bash
npm run build
```

### 2. 手动上传
- 访问：https://github.com/AI-Eleven-Three/PowerMaintenanceSystem/settings/pages
- 在"Source"中选择"Upload an artifact"
- 上传`dist`目录中的所有文件

## 方法3：使用GitHub CLI

### 1. 安装GitHub CLI
```bash
brew install gh
```

### 2. 登录
```bash
gh auth login
```

### 3. 推送代码
```bash
git push origin main
```

## 部署完成后访问

部署完成后，可以通过以下地址访问：
- https://ai-eleven-three.github.io/PowerMaintenanceSystem/

## 查看部署状态

访问以下地址查看部署进度：
- https://github.com/AI-Eleven-Three/PowerMaintenanceSystem/actions

## 启用GitHub Pages

如果还没有启用GitHub Pages：
1. 访问：https://github.com/AI-Eleven-Three/PowerMaintenanceSystem/settings/pages
2. 在"Source"中选择"GitHub Actions"
3. 保存设置
