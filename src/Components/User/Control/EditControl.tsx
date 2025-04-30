import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { addControlApi, editControlApi } from '../../../services/userAPI';
import { toast } from 'react-toastify';

const EditControl = ({ popup, category,controlFetch }: any) => {
  // Helper function to get user ID from token
  const getUserId = (): string | null => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const user = JSON.parse(token);
        return user?.userId || null;
      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }
    return null;
  };


  console.log('categroy', category  )
  // Initial values for the form
  const initialValues = {
    categoryName: category?.categoryName,
    amount: category?.amount,
    description: category?.description || '',
      endDate: category?.endDate ? new Date(category.endDate).toISOString().split('T')[0] : ''
  };

  // Validation Schema
  const validationSchema = yup.object({
    categoryName: yup.string().required('Control name is required'),
    amount: yup
      .number()
      .typeError('Control amount must be a number')
      .positive('Control amount must be greater than zero')
      .required('Control amount is required'),
    description: yup.string().required('Description is required'),
    endDate: yup
      .date()
      .min(new Date(), 'End date must be in the future')
      .required('End date is required'),
  });

  // Form submit handler
  const handleSubmit = async (value: any, { resetForm }: any) => {
    const id = getUserId();

    if (!id) {
      toast.error('User not authenticated. Please log in again.', { autoClose: 1500 });
      return;
    }

    try {
      const controlId=category._id
      
      await editControlApi(value, id,controlId);
      controlFetch()
      toast.success('Control added successfully', { autoClose: 1500 });
      popup(); 
      resetForm(); 
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage, { autoClose: 1500 });
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        Edit Control
                      </h3>
                      <p
                        onClick={popup}
                        className="cursor-pointer text-xl text-gray-700 hover:text-black"
                      >
                        X
                      </p>
                    </div>
                    <div className="mt-10">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form className="flex flex-col gap-y-4">
                            {/* Control Name Field */}
                            <label className="text-sm font-medium text-gray-700">
                              Control Name
                              <Field
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                                type="text"
                                name="categoryName"
                                placeholder="Control Name"
                              />
                            </label>
                            <ErrorMessage
                              name="categoryName"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Control Amount Field */}
                            <label className="text-sm font-medium text-gray-700">
                              Control Amount
                              <Field
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                                type="number"
                                name="amount"
                                placeholder="Control Amount"
                              />
                            </label>
                            <ErrorMessage
                              name="amount"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Description Field */}
                            <label className="text-sm font-medium text-gray-700">
                              Description
                              <Field
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                                as="textarea"
                                name="description"
                                placeholder="Description"
                                rows={3}
                              />
                            </label>
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* End Date Field */}
                            <label className="text-sm font-medium text-gray-700">
                              End Date
                              <Field
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                                type="date"
                                name="endDate"
                              />
                            </label>
                            <ErrorMessage
                              name="endDate"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Submit Button */}
                            <button
                              type="submit"
                              className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Updating...' : 'Upadte'}
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
              {/* Close Button (optional) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditControl;
