# Lumina Books - Bookstore Platform

A modern full-stack bookstore web application with **Infrastructure as Code (Terraform)** and **CI/CD pipeline** using **Azure DevOps** and **Azure Kubernetes Service (AKS)**.

---

## 🚀 Project Features

- Beautiful responsive frontend (HTML + Tailwind CSS)
- Backend (Node.js + Express)
- Infrastructure as Code using **Terraform**
- Containerized with **Docker**
- Deployed to **Azure Kubernetes Service (AKS)**
- CI/CD Pipeline using **Azure DevOps**

---

## 📁 Project Structure
lumina-books/
├── frontend/              # Static HTML, CSS, JS
├── backend/               # Node.js Express server
├── terraform/             # IaC - Terraform scripts
├── k8s/                   # Kubernetes manifests
├── docker/                # Docker related files (optional)
├── Dockerfile
├── azure-pipelines.yml    # Azure DevOps CI/CD pipeline
├── package.json
└── README.md

---

## 🛠️ Step-by-Step Setup Guide

### 1. Prerequisites

- Azure Subscription
- Azure DevOps Organization
- Terraform installed (or use Azure DevOps Terraform task)
- Docker Desktop (for local testing)
- kubectl (for Kubernetes)
- Git

### 2. Clone / Setup Project

```bash
git clone <your-repo-url>
cd lumina-books

### 3.Terraform - Provision Infrastructure

    
cd terraform

# Initialize
terraform init

# Review changes
terraform plan

# Deploy infrastructure (Resource Group, ACR, AKS, etc.)
terraform apply -auto-approve

Important Outputs after deployment:

ACR Login Server
AKS Cluster Name
Resource Group Name

### 4. Local Development

Run Backend Locally
Bashcd backend
npm install
npm start

Run Frontend
Open frontend/index.html in browser (or serve it statically).

### 5. Docker - Build & Test Locally
Bash# Build Docker image
docker build -t lumina-books:latest .

# Run container
docker run -p 3000:3000 lumina-books:latest

### 6. Azure DevOps CI/CD Pipeline

Push your code to Git repository (Azure Repos or GitHub)
In Azure DevOps, create a new Pipeline
Select Existing Azure Pipelines YAML file
Choose azure-pipelines.yml
Create required Service Connections:
Azure Resource Manager (for AKS)
Docker Registry (for ACR)


###7. Deploy Using Pipeline
Push code to main branch → Pipeline will automatically trigger
Pipeline stages:
Terraform → Provision/Update infrastructure
Build → Build Docker image & push to ACR
Deploy → Deploy to AKS using Kubernetes manifests


## 8. Verify Deployment
Bash# Get AKS credentials
az aks get-credentials --resource-group rg-lumina-books-dev --name aks-lumina-books-dev

# Check pods and services
kubectl get pods
kubectl get svc