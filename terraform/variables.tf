variable "resource_group_name" {
  type        = string
  description = "Azure Resource Group name"
}

variable "location" {
  type        = string
  description = "Azure region"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "virtual_network_name" {
  type        = string
  description = "Virtual Network name"
}

variable "aks_subnet_name" {
  type        = string
  description = "AKS subnet name"
}

variable "registry_name" {
  type        = string
  description = "Azure Container Registry name"
}

variable "keyvault_name" {
  type        = string
  description = "Azure Key Vault name"
}

variable "aks_cluster_name" {
  type        = string
  description = "AKS cluster name"
}

variable "node_count" {
  type        = number
  description = "AKS node count"
  default     = 2
}

variable "vm_size" {
  type        = string
  description = "AKS node VM size"
  default     = "Standard_DS2_v2"
}

variable "jwt_secret" {
  type        = string
  description = "JWT secret for application"
  sensitive   = true
}
