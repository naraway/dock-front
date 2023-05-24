# @nara-way/dock

The Dock service is an integral module of the SaaS service Multi-Application, a service that helps manage movement and 
context between applications. on [NARA Way](https://gitlab.com/nara-way).

## Features

The Dock service provides the following features:

1. **Authentication:**  
The Dock service provides user authentication and supports login and secure session management. 
Users can sign in with their account to move between applications and view menus based on their permissions.


2. **User context management:**  
The Dock service manages each user's work context. Each user works within their own unique
context and is granted application usage and permissions according to that context.


3. **Shared service integration:**  
Dock services support integration between shared services. You can easily establish 
connections with other services used in your application. This allows you to extend the functionality of your 
application and integrate them with simple code.

Dock services are useful for both developers and users. Developers can develop and integrate applications more easily,
and users can use applications more efficiently.

## Installation

```sh
npm install @nara-way/dock-core
npm install @nara-way/dock-ui
```

## Usage

### Auth and Dock

To use the Auth and Dock features, the top-level App component of the 
application used, or the preview component of Storybook, must go through the 
following initialization process.

```tsx
const SomeComponent = ({ children }: PropsWithChildren) => {
  const dock = useDock();
  const auth = useAuth();

  // axios header interceptor
  initInterceptors();

  // if dev mode, set dev context
  if (dev.development) {
    auth._dev.init(dev.auth);
    dock._dev.init(dev.dock);
  }
  
  return (
    <>
      {children}
    </>
  );
}
```

For development purposes, you can handle `_dev.init(...)' through the 
following configuration file to run it in a local environment without 
accessing the server and checkpoint service and metro service.

```ts
const dev = process.env.NODE_ENV !== 'production';

const auth = {
  development: dev,
  user: {
    username: 'nara',
    displayName: 'NARA',
    pavilionId: '1:1:1',
    email: 'nara@naraway.io',
    additionalInformation: {},
  },
  token: {
    access:
      'eyJXXX.eyJXXX.hUyXXX', // jwt access token
    refresh:
      'eyJXXX.eyJXXX.PiLXXX', // jwt refresh token
    refreshed: false,
  },
};

const dock = {
  development: dev,
  session: {
    pavilion: { id: '1:1:1', name: 'NARA Way' },
    citizen: { id: '1@1:1:1', name: 'NARA' },
    cinerooms: [
      {
        cineroom: { id: '1:1:1:1', name: 'Management' },
        audience: { id: '1@1:1:1:1', name: 'NARA' },
        active: true,
        stages: [
          {
            stage: { id: '1:1:1:1-1', name: 'Lab' },
            actor: { id: '1@1:1:1:1-1', name: 'NARA' },
            active: true,
            kollections: [
              {
                kollection: { code: 'product', name: 'Product' },
                path: 'product',
                active: true,
                kollecties: [
                  {
                    path: 'notice',
                    name: 'Notice',
                    requiredRoles: ['user'],
                  },
                ],
                kollectionRoles: [
                  {
                    code: 'user',
                    name: 'User',
                    defaultRole: true,
                    dramaRoles: [
                      {
                        dramaId: 'product',
                        code: 'user',
                        name: 'User',
                        defaultRole: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    defaultStage: { id: '1:1:1:1-1', name: 'Workspace' },
    defaultFirstForStage: true,
  },
};

export default {
  development: dev,
  auth,
  dock,
};
```

## Getting more help

Visit the Nara Way page to get more information about the library:  
[https://github.com/naraway](https://github.com/naraway)

You can ask any question about Nara Way using the [NARA Way Page](https://www.naraway.io).
