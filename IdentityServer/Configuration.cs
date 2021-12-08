using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer
{
    public static class Configuration
    {
        public static IEnumerable<IdentityResource> GetIdentityResources() =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                //new IdentityResources.Profile(),
                new IdentityResource
                {
                    Name = "rc.scope",
                    UserClaims =
                    {
                        "rc.garndma"
                    }
                },
            };

        public static IEnumerable<ApiResource> GetApis() => 
            new List<ApiResource> { 
                new ApiResource("ApiOne")
                {
                    UserClaims = { "rc.api.garndma" },
                    Scopes = { "ApiOne" }
                },

                new ApiResource("ApiTwo") 
                {
                    Scopes = { "ApiTwo" }
                },

                new ApiResource("WardrobeApi")
                {
                    Scopes = { "WardrobeApi" }
                },
            };

        public static IEnumerable<Client> GetClients() =>
            new List<Client> { 
                //new Client {
                //    ClientId = "client_id",
                //    ClientSecrets = { new Secret("client_secret".ToSha256()) },
                //    AllowedGrantTypes = GrantTypes.ClientCredentials,
                //    AllowedScopes = { "ApiOne" },
                //},
                //new Client {
                //    ClientId = "client_id_mvc",
                //    ClientSecrets = { new Secret("client_secret_mvc".ToSha256()) },
                //    AllowedGrantTypes = GrantTypes.Code,

                //    RedirectUris = { "https://localhost:44343/signin-oidc" },

                //    AllowedScopes = { 
                //        "ApiOne", 
                //        "ApiTwo", 
                //        IdentityServerConstants.StandardScopes.OpenId,
                //        //IdentityServerConstants.StandardScopes.Profile,
                //        "rc.scope",
                //    },
                //    AllowOfflineAccess = true,
                //    //AlwaysIncludeUserClaimsInIdToken = true,
                //    RequireConsent = false
                //},
                new Client
                {
                    ClientId = "client_id_js",
                    //ClientSecrets = { new Secret("client_secret_js") },
                    AllowedGrantTypes = GrantTypes.Implicit,
                    
                    RedirectUris = { "http://localhost:9000/callback" },
                    
                    //dont know if is needed
                    AllowedCorsOrigins = { "http://localhost:9000" },

                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Email,
                        "ApiOne",
                        "ApiTwo",
                        "WardrobeApi",
                        "rc.scope",
                    },

                    //AccessTokenLifetime = 2,

                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false
                }
            };

        public static IEnumerable<ApiScope> GetScopes() =>
            new List<ApiScope> { 
                new ApiScope ("ApiOne", "First Api"),
                new ApiScope ("ApiTwo", "Second Api"),
                new ApiScope ("WardrobeApi", "Wardrobe Api"),
            };
    }
}
