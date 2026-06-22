import yup from "yup";
 
export const userSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .trim()
    .required()
    ,
 
  email: yup
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .trim(),
 
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .required()
    ,
});
 
export const userValidate = (schema) => async (req, res, next) => {

  try {
    await schema.validate(req.body)
    next()
  } catch (err) {
    return res.status(400).json({errors: err.errors})
  }
  
}