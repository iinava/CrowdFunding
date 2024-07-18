import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import api from "../../lib/api";
import { Toaster, toast } from "sonner";


export default function Profile() {
  const [profile, setProfile] = useState({
    legal_name: "",
    phone: "",
    city: "",
    country: "",
    address: ""
  });

  useEffect(() => {
    api.get("http://127.0.0.1:8000/api/user/profile/").then((response) => {
      setProfile(response.data.data);
      console.log(response.data.data);
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };
  const [isloading, setisloading] = useState(false)

  const handleProfileUpdate = (e) => {
  
    setisloading(true);
    e.preventDefault();
    api.put("http://127.0.0.1:8000/api/user/profile/", profile).then((response) => {
      setProfile(response.data.data);
      toast.success("profile updated successfully");
      
    }).catch((error) => {
      try {
        toast.error(error.response.data.detail);
      } catch (error) {
        toast.error("Failed to update, please try later");
      }
    }).finally(
      setisloading(false)
    )
  };

  return (
    <div className="w-full  min-h-[70vh]">
      <Toaster position="top-right" richColors />
      <section>
        <div className="mx-auto max-w-screen-xl py-3">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12 space-y-4 h-min  bg-neutral-900 p-3 rounded-2xl">
              <p className="max-w-xl text-lg">
                Provide details are used for verification purposes only. Make
                sure you fill out the correct information.

              </p>
              <p>verification status <span>{profile.is_verified ? "✅" : "❌"}</span></p>
              <span className="text-blue-200">Verifiying profile updates may take up to one week </span>
            </div>
            <div className="rounded-lg  shadow-lg lg:col-span-3 lg:px-12">
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="" htmlFor="legal_name">
                    Legal name
                  </label>
                  <Input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Enter your legal name"
                    type="text"
                    id="legal_name"
                    value={profile.legal_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="" htmlFor="phone">
                    Phone
                  </label>
                  <Input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Enter your phone number"
                    type="text"
                    id="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="" htmlFor="city">
                      City
                    </label>
                    <Input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Enter current city"
                      type="text"
                      id="city"
                      value={profile.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="" htmlFor="country">
                      Country
                    </label>
                    <Input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Country"
                      type="text"
                      id="country"
                      value={profile.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="" htmlFor="country">
                      Account number
                    </label>
                    <Input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="account_number"
                      type="text"
                      id="account_number"
                      value={profile.account_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="" htmlFor="country">
                      ifsc code
                    </label>
                    <Input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="ifsc_code"
                      type="text"
                      id="ifsc_code"
                      value={profile.ifsc_code}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="" htmlFor="country">
                    upi_id
                    </label>
                    <Input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="upi_id"
                      type="text"
                      id="upi_id"
                      value={profile.upi_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="" htmlFor="address">
                    Address
                  </label>
                  <Textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Enter your current address"
                    rows="8"
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                  ></Textarea>
                </div>
                <div className="mt-4 px-3">
                  <Button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-white px-3 py-3 font-medium text-black"
                  >
                    { isloading ? "Loading..." : "Update Profile" }
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}
