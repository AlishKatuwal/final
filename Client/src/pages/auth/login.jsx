import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/form'; 
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/authSlice/index';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
const loginFormControl = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    componentType: 'input',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    componentType: 'input',
    required: true,
  }
];

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
const dispatch = useDispatch();
const { toast } = useToast();
const navigate = useNavigate();
  
function onSubmit(e) {
  e.preventDefault();
  dispatch(loginUser(formData)).then((data) => {
    console.log('Login response:', data); 

    if (data?.payload?.success) {
      toast({
        title: data?.payload?.message,
      });
    } else {
      toast({
        title: data?.payload?.message,
        variant: "destructive",
      });
    }
  });
}


  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign In To Your Account</h1>
        <p className='mt-2'>
          Don't have an account?
          <Link className="font-medium text-primary hover:underline" to='/auth/register'>
           Register
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Sign In"
      />
    </div>
  );
};

export default Login;

