# LifeManager.

## Description

This project is designed to serve as bare-bones example of a proprietary single-page application including a client, multiple Apis, and an identity server. 

## Installation

- Clone your forked repository

## Technologies

### Client
The client is written in Typescript Javascript using React with Redux + redux-oidc. 
Webpack is used to bundle, manage builds, and run a development server. React components from Ant Design and MaterialsUI are also used throughout the client.

### API
The APIs all run on .NET Core 6.0 and access local databases running on MySql and Microsoft SQL server. Currently I am looking for better solutions to interface with the database including trying to build my own object-relational mapping.

### Authorization Server
This server uses Duede IdentityServer to handle management of tokens and users. This server uses an implicit flow to handle authorization. Currently EntityFrameworks is used to store user databases.

## Additional tools

-----------