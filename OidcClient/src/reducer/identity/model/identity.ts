import { User } from "oidc-client";

export type Identity = {
    user: User | null;
}