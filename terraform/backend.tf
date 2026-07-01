terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform"
    storage_account_name = "tfstatestore82930"
    container_name       = "tfstate"
    key                  = "bookstore-prod.tfstate"

    use_azuread_auth = true
  }
}
