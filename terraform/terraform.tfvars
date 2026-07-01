resource_group_name = "rg-bookstore-prod"
location            = "austriaeast"
environment         = "prod"

virtual_network_name = "vnet-bookstore-prod"
aks_subnet_name      = "snet-aks-prod"

registry_name         = "acrbookstoreprod001"
keyvault_name         = "kv-bookstore-prod001"
aks_cluster_name      = "aks-bookstore-prod"

node_count = 2
vm_size    = "Standard_DS2_v2"

jwt_secret = "change-this-to-a-strong-production-secret"