"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-green-500 h-screen flex items-center justify-center">
      <div className="flex justify-evenly bg-blue-500 w-5/6 h-3/4">
        <div className="flex flex-col gap-1.5">
          <p>Business Details</p>
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            disabled={isEditing ? false : true}
            type="text"
            id="businessName"
            placeholder="Your Business Name"
          />
          <Label htmlFor="address">Address</Label>
          <Input
            disabled={isEditing ? false : true}
            type="text"
            id="Address"
            placeholder="123 Real Address"
          />
          <Label htmlFor="city">City</Label>
          <Input
            disabled={isEditing ? false : true}
            type="text"
            id="City"
            placeholder="Calgary"
          />
          <Label htmlFor="province">Province</Label>
          <Input
            disabled={isEditing ? false : true}
            type="text"
            id="province"
            placeholder="Alberta"
          />
          <Label htmlFor="postal">Postal Code</Label>
          <Input
            disabled={isEditing ? false : true}
            type="text"
            id="postal"
            placeholder="A1B2C3"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div>
            <p>Contact Details</p>
            <p>Click on icon in the top right to edit</p>
          </div>

          <div>
            <p>Clover Details</p>
            <Label htmlFor="merchantID">Merchant ID</Label>
            <Input
              disabled={isEditing ? false : true}
              type="text"
              id="merchantID"
              placeholder=""
            />
            <Label htmlFor="API Key">API Key</Label>
            <Input
              disabled={isEditing ? false : true}
              type="text"
              id="postal"
              placeholder=""
            />
          </div>

          {isEditing ? (
            <div>
              <Button
                className="w-20 bg-red-500 hover:bg-gray-600"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="w-20 bg-red-500 hover:bg-gray-600"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              className="w-20 bg-red-500 hover:bg-gray-600"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
