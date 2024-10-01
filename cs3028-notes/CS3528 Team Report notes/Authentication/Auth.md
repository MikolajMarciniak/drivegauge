Authentication system is [Authelia](https://www.authelia.com) hosted at [auth.drivegauge.co.uk](https://auth.drivegauge.co.uk).

## Choice of software
Keycloak and Authelia where considered as they are both things I am familiar with.
### Keycloak advantages
- Support for both OIDC and SAML
- Social login support (Login with Gooogle etc)
- Mature theme support
- Management UI
### Keycloak disadvantages
- Large, resource intensive, Java application
- Difficult to setup and administer
- Permissions system does a lot, but this makes it difficult to comprehend
### Authelia advantages
- Fast, small, golang application
- Not full of feature bloat
- Support for [WebAuthn](https://webauthn.guide) with user self enrollment
- [Trusted header SSO](https://www.authelia.com/integration/trusted-header-sso/introduction/), negating the need to implement OIDC in every part of our stack
- Support for in-built user database, with ability to move to LDAP backend in future
### Authelia disadvantages
- No config UI, all configured by a YAML file
- Themeing is not well documented
- No social login
- No support for SAML, which may be a problem if we choose to integrate third party software that requires SAML into our stack

## Trusted headers
The following headers are passed to the backend once a user is authenticated.

| Header | Contents | Example |
|-|-|-|
| Remote-User | The users username | John |
| Remote-Groups | The groups the user belongs to, comma seperated | admin,dev |
| Remote-Name | The users display name | John Smith |
| Remote-Email | The users email address | jsmith@example.com |

Additionally `X-Forwarded-For` may be useful for logging the actual IP of the user.