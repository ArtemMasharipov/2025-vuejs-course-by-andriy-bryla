import * as yup from 'yup';

export const driverSchema = yup.object({
  name: yup.string()
    .required('Driver name is required'),
  
  licenseNumber: yup.string()
    .required('License number is required'),
  
  experience: yup.number()
    .required('Experience is required')
});

export const busSchema = yup.object({
  model: yup.string()
    .required('Bus model is required'),
  
  licensePlate: yup.string()
    .required('License plate is required'),
  
  capacity: yup.number()
    .required('Capacity is required')
});

export const assignmentSchema = yup.object({
  driverId: yup.mixed()
    .test(
      'is-not-empty',
      'Driver selection is required',
      (value) => value !== undefined && value !== null && value !== ''
    ),
  
  busId: yup.mixed()
    .test(
      'is-not-empty',
      'Bus selection is required',
      (value) => value !== undefined && value !== null && value !== ''
    )
});
