import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
    return <SignUp afterSignUpUrl="new-user" forceRedirectUrl="/new-user" />
}

export default SignUpPage;