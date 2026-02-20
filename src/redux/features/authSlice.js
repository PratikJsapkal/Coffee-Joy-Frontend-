import  { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {  signup ,login ,verifyOtp , resendOtp ,forgetPassword ,resetPassword, sellerVerify , userInfo ,userLogOut ,changePassword } from '@/api/authApi'
import { toast } from "react-toastify";

export const singupThunk = createAsyncThunk(
    "auth/signup",
     async (userData ,{rejectWithValue})=>{
      try {
         const res = await signup(userData)
        return {
            otpSent : true ,
            tempUser : res.data
        }
      } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Signup failed"
        )
      }
     }
)

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (userData,{rejectWithValue})=>{
        try {
            const res = await login(userData)
            console.log(res)
          if (res.success) {
        return res.user; // only return the user
      } else {
        return rejectWithValue(res.message); // reject on failure
      }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "login failed"
            )
        }
    }
)

// seller login
export const sellerLoginThunk = createAsyncThunk(
  "auth/sellerLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await login({ ...userData, role: "seller" });

      if (res.success) {
        return {
          email: userData.email
        };
      }

      return rejectWithValue(res.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Seller login failed"
      );
    }
  }
);


// seller verify otp
export const sellerVerifyThunk = createAsyncThunk(
  "auth/seller/verify-otp", 
  async(otpCode, {rejectWithValue})=>{
    try {
      const res = await sellerVerify(otpCode)
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "otp failed"
      )
    }
  }
)

export const otpThunk = createAsyncThunk(
    "auth/verifyOtp",
    async (data , {rejectWithValue})=>{
        try {
            const res = await verifyOtp(data)
            return res
        } catch (error) {
           return rejectWithValue(
                error.response?.data?.message || "verification failed"
            ) 
        }
    }
)

export const resendThunk = createAsyncThunk(
    "auth/resendOtp",
    async (resendotp ,{rejectWithValue})=>{
        try {
            const res = await resendOtp(resendotp)
            return  res
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "OTP not send"
            )
        }
    }
)

export const forgotpassThunk = createAsyncThunk(
    "auth/forgotPassword",
    async (forgetpass ,{rejectWithValue })=>{
        try {
            const res = await forgetPassword(forgetpass)
            return res
            
        } catch (error) {
            return rejectWithValue(
            error.response?.data?.message || "User not found "
            )
        }
    }
)

export const resetPasswordThunk = createAsyncThunk(
    "auth/resetPassword",
    async (newPassword ,{rejectWithValue })=>{
        try {
            const res = await resetPassword(newPassword)
            return res
            
        } catch (error) {
            return rejectWithValue(
            error.response?.data?.message || "User not found "
            )
        }
    }
)



export const userInfoThunk = createAsyncThunk(
    "auth/userInfo",
    async(_, {rejectWithValue} )=>{
         try {
            const res = await userInfo()
            return res
         } catch (error) {
            return rejectWithValue(
                  error.response?.data?.message || "Not authenticated"
            )
         }
    }
)

export const userLogoutThunk = createAsyncThunk(
    "auth/userLogout",
     async ()=>{
        try {
            const res = await userLogOut()
        } catch (error) {
            console.log(error)
        }
     }
)

export const changePasswordThunk = createAsyncThunk(
    "auth/changePass",
    async(changedPass, {rejectWithValue})=>{
        try {
            const res = await changePassword(changedPass)
        } catch (error) {
            return rejectWithValue(
                  error.response?.data?.message || "Not authenticated"
            ) 
        }
    }
)


const auth = createSlice({
    name:"auth",
    initialState :{
        user : null,
        isAutherised :false,
        authChecked:false,
        loading:false,
        error:null,
        otpSent : false,
        otpVerified : false,
        tempUser :null,
        isResetPass : false,
        forgotSteps : "EMAIL"
    },
    reducers:{
        resetOtpState : (state)=>{
            state.otpSent = false;
            state.tempUser = null
            state.otpVerified=false
        },
        setUser :(state,action)=>{
            state.user = action.payload
        }
    },
    extraReducers:(builder)=>{
         builder
           .addCase(singupThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(singupThunk.fulfilled, (state, action) => {
             state.loading = false;
             state.otpSent = true;
             state.tempUser = action.payload.tempUser;

             toast.success("OTP send successfully");
           })
           .addCase(singupThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;

             toast.error(action.payload);
           })

           .addCase(loginThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(loginThunk.fulfilled, (state, action) => {
             state.loading = false;
             state.user = action.payload;
             state.isAutherised = true;
             state.authChecked = true;
             toast.success("login successfully");
           })

           .addCase(loginThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
             toast.error(action.payload);
           })

           .addCase(otpThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(otpThunk.fulfilled, (state, action) => {
             state.loading = false;
             state.forgotSteps = "RESET";
             state.otpVerified = true;

             toast.success("accout created successfully");
           })

           .addCase(otpThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
             toast.error(action.payload);
           })

           .addCase(resendThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(resendThunk.fulfilled, (state) => {
             state.loading = false;
             state.otpSent = true;
             toast.success("OTP sent successfully");
           })

           .addCase(resendThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
             toast.error(action.payload);
           })

           .addCase(forgotpassThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(forgotpassThunk.fulfilled, (state) => {
             state.loading = false;
             state.forgotSteps = "OTP";
             toast.success("OTP send successfully");
           })

           .addCase(forgotpassThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
             toast.error(action.payload);
           })

           .addCase(resetPasswordThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(resetPasswordThunk.fulfilled, (state) => {
             state.loading = false;
             state.isResetPass = true;
             toast.success("Password reset successfully");
           })

           .addCase(resetPasswordThunk.rejected, (state, action) => {
             state.loading = false;
             state.isResetPass = false;
             state.error = action.payload;
           })

           .addCase(userInfoThunk.fulfilled, (state, action) => {
             state.user = action.payload.user;
             state.isAutherised = true;
             state.authChecked = true;
             state.loading = false;
           })

           .addCase(userInfoThunk.rejected, (state) => {
             state.user = null;
             state.isAutherised = false;
             state.authChecked = true;
             state.loading = false;
           })

           .addCase(userLogoutThunk.fulfilled, (state) => {
             state.user = null;
             state.isAutherised = false;
             state.authChecked = true;
           })

           .addCase(userLogoutThunk.rejected, (state, action) => {
             state.error = action.payload;
           })

           .addCase(changePasswordThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(changePasswordThunk.fulfilled, (state) => {
             state.loading = false;
             toast.success("Password Changed Sucessfully");
           })

           .addCase(changePasswordThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
             toast.error(action.payload);
           })

           //  seller login addcases
           // login
           .addCase(sellerLoginThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(sellerLoginThunk.fulfilled, (state, action) => {
             state.loading = false;
             state.otpSent = true;
             state.tempUser = action.payload.email;
             toast.success("OTP sent to your email");
           })

           .addCase(sellerLoginThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
             toast.error(action.payload);
           })

           //  seller login verification addcases
           // login verify otp
           .addCase(sellerVerifyThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(sellerVerifyThunk.fulfilled, (state) => {
             state.loading = false;
             state.otpVerified = true;
             toast.success("Seller login successfully");
           })

           .addCase(sellerVerifyThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
             toast.error(action.payload);
           });
    }
    

})

export default auth.reducer