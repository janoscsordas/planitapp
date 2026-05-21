import { Field } from "../ui/field";
import OAuthButton from "./oauth-button";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export default function OAuthField({ lastLoginMethod }: { lastLoginMethod?: string | null }) {
    return (
        <Field className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <OAuthButton
                provider={{
                    id: "github",
                    name: "Folytatás GitHub fiókkal",
                    icon: <IconBrandGithub />,
                }}
            />
            <OAuthButton
                provider={{
                    id: "google",
                    name: "Folytatás Google fiókkal",
                    icon: <IconBrandGoogle />,
                }}
                disabled={true}
            />
        </Field>
    )
}