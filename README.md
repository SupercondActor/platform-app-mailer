# SupercondActor Business Platform for Microsoft Azure Service Fabric 

## Corporate Mailer Example
> This is a sample project demonstrating business microservices sending messages to Azure Service Bus Queue, receiving queue messages, and sending emails through Amazon Simple Email Service.

### Prerequisites

- Service Fabric cluster with SupercondActor apps created and configured (see deployment scripts in this [GitHub repo](https://github.com/SupercondActor))
- This project built into the package zip file (see instructions below)

### How to build and install

- clone this project
- in the project's root folder run command: `npm run build`
- using the SupercondActor Manager UI upload the Application Services Code package file ./dist/BusinessScriptBundle.zip that you just created.

See detailed documentation on the [SupercondActor website](https://www.supercondactor.com/documentation).