import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Skeleton, Textarea } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateProfile } from "../../features/ProfileSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchma } from "../../lib/zodschema";
import {ProfileSkelton} from "../../components/Skeltons";

export default function Profile() {
  const dispatch = useDispatch();
  const profiledata = useSelector((state) => state.profile.profiledata);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  const updationloader = useSelector((state) => state.profile.updationloader);
  const updationerror = useSelector((state) => state.profile.updationerror);
  const updationsuccess = useSelector((state) => state.profile.updationsuccess);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProfileSchma),
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profiledata) {
      Object.keys(profiledata).forEach((key) => {
        setValue(key, profiledata[key]);
      });
    }
  }, [profiledata, setValue]);

  useEffect(() => {
    if (updationsuccess) {
      toast.success("Profile updated successfully");
    }
    if (updationerror) {
      toast.error(updationerror);
    }
  }, [updationsuccess, updationerror]);

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  if (error)
    return (
      <>
        <p className="text-center">Some error occured loadig profile</p>
      </>
    );
  else
    return (
      <div className="w-full min-h-[70vh]">
        <Toaster position="top-right" richColors />
        <section>
          <div className="mx-auto max-w-screen-xl py-3">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="lg:col-span-2 lg:py-12 space-y-4 h-min bg-neutral-900 p-3 rounded-2xl">
                <p className="max-w-xl text-lg">
                  Provide details are used for verification purposes only. Make
                  sure you fill out the correct information.
                </p>
                <p className="text-sm text-red-200">
                  Verification status{" "}
                  <span>{profiledata?.is_verified ? "✅" : "❌"}</span>
                </p>
                <span className="text-blue-200">
                  Verifying profile updates may take up to one week
                </span>
              </div>

              {loading ? (
                <ProfileSkelton />
              ) : (
                <div className="rounded-lg shadow-lg lg:col-span-3 lg:px-12">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label htmlFor="legal_name">Legal name</label>
                      <Controller
                        name="legal_name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Enter your legal name"
                            type="text"
                            id="legal_name"
                          />
                        )}
                      />
                      {errors.legal_name && (
                        <p className="text-sm text-red-200">
                          {errors.legal_name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone">Phone</label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Enter your phone number"
                            type="text"
                            id="phone"
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-200">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="city">City</label>
                        <Controller
                          name="city"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="w-full rounded-lg border-gray-200 p-3 text-sm"
                              placeholder="Enter current city"
                              type="text"
                              id="city"
                            />
                          )}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-200">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="country">Country</label>
                        <Controller
                          name="country"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="w-full rounded-lg border-gray-200 p-3 text-sm"
                              placeholder="Country"
                              type="text"
                              id="country"
                            />
                          )}
                        />
                        {errors.country && (
                          <p className="text-sm text-red-200">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="account_number">Account number</label>
                        <Controller
                          name="account_number"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="w-full rounded-lg border-gray-200 p-3 text-sm"
                              placeholder="Account number"
                              type="text"
                              id="account_number"
                            />
                          )}
                        />
                        {errors.account_number && (
                          <p className="text-sm text-red-200">
                            {errors.account_number.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="ifsc_code">IFSC code</label>
                        <Controller
                          name="ifsc_code"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="w-full rounded-lg border-gray-200 p-3 text-sm"
                              placeholder="IFSC code"
                              type="text"
                              id="ifsc_code"
                            />
                          )}
                        />
                        {errors.ifsc_code && (
                          <p className="text-sm text-red-200">
                            {errors.ifsc_code.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="upi_id">UPI ID</label>
                        <Controller
                          name="upi_id"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="w-full rounded-lg border-gray-200 p-3 text-sm"
                              placeholder="UPI ID"
                              type="text"
                              id="upi_id"
                            />
                          )}
                        />
                        {errors.upi_id && (
                          <p className="text-sm text-red-200">
                            {errors.upi_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="address">Address</label>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Enter your current address"
                            rows="8"
                            id="address"
                          ></Textarea>
                        )}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-200">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 px-3">
                      <Button
                        type="submit"
                        className="inline-block w-full rounded-lg bg-white px-3 py-3 font-medium text-black"
                      >
                        {updationloader ? "Loading..." : "Update Profile"}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
}
