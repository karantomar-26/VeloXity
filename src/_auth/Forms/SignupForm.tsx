import * as z from "Zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation/"
import {Link, useNavigate} from "react-router-dom"
import Loader from "@/components/Loader"
import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/authContext"




const SignupForm = () => {

  const {toast} = useToast();
  const { checkAuthUser, isLoading : isUserLoading } = useUserContext();
  const navigate = useNavigate();
  


  const { mutateAsync : createUserAccount, isPending : isCreatingAccount  } =useCreateUserAccount();
  
  const { mutateAsync : signInAccount, isPending : isSigningIn  } = useSignInAccount();



  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: { 
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if(!newUser){
      return toast({title: 'Sign up failed. Please try again.'})
    }

    const session= await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({title: 'Sign In Failed. Please try again.'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();

      navigate('/')
    
    }else{
      toast({title: 'Sign up failed, Please try again.'})
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col ">
        <img className="h-[7vh] w-[27vh] -mb-5" src="VELOXITY_LOGO-removebg.png" alt="logo"/>

        <h2 className="h3-bold md:h2-bold pt-4 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use VeloXity enter your details</p>

      
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-1">Name</FormLabel>
                  <FormControl className="mb-2">
                    <Input className="rounded-md p-2 shad-input" type="text"  {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-1">Username</FormLabel>
                  <FormControl className="mb-2">
                    <Input className="rounded-md p-2 shad-input" type="text"  {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-1">Email</FormLabel>
                  <FormControl className="mb-2">
                    <Input className="rounded-md p-2 shad-input" type="text"  {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-1">Password</FormLabel>
                  <FormControl className="mb-2">
                    <Input className="rounded-md p-2 shad-input" type="text"  {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary justify-center py-2 rounded-lg ">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ): "Sign up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link to="/sign-in" className="text-primary-500 text-small-medium ml-1"> Log in </Link>
          </p>
        </form>
      </div>

    </Form>
  )
}

export default SignupForm