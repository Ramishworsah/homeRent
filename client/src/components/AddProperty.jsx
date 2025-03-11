import React, { useState, useContext } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
  ConfigProvider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  postProperty,
  uploadPropertyImage,
  getAllProperties,
} from "../api/property";
import AppContext from "../AppContext";

const { Option } = Select;

const AddProperty = ({ setModalOpen }) => {
  const { user, setProperties, setLoading } = useContext(AppContext);
  const [fileList, setFileList] = useState([]);

  const cities = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune", "Nagpur", "Kochi", "Trivendrum", "Indore", "Vadodara"];
  const facilities = ["School", "Hospital", "Supermarket", "Park", "Mall", "Metro", "Bus Stop", "Railway Station", "Airport", "Highway", "Petrol Pump", "ATM", "Bank", "Market", "College"];

  const handleUpload = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Keep only the latest selected file
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // 1️⃣ Create the property first
      const newProperty = {
        price: values.price,
        bhk: values.bhk,
        area: values.area,
        location: values.location,
        city: values.city,
        nearbyFacilities: values.nearbyFacilities,
      };

      const response = await postProperty(newProperty, user);
      if (!response?._id) {
        message.error("Error while adding property");
        return;
      }

      let uploadedImage = false;

      // 2️⃣ If an image is selected, upload it separately
      if (fileList.length > 0) {
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj);

        const uploadResponse = await uploadPropertyImage(response._id, formData, user);
        uploadedImage = !!uploadResponse?._id;
      }

      // 3️⃣ Display success message
      message.success(uploadedImage ? "Property added successfully" : "Property added without image");

      // 4️⃣ Refresh the property list
      const allProperties = await getAllProperties(user);
      if (Array.isArray(allProperties)) {
        setProperties(allProperties);
      } else {
        console.log("Error while fetching properties");
      }
    } catch (error) {
      console.error("❌ Unable to add property:", error);
      message.error("Unable to add property");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00a200" } }}>
      <Form onFinish={handleSubmit} autoComplete="off">
        <div className="grid grid-cols-2 gap-2">
          {/* Image Upload */}
          <Form.Item label="Upload Image">
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false} // Prevent auto-upload
              onChange={handleUpload}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          {/* Property Details */}
          <Form.Item name="price" label="Price (INR)" rules={[{ required: true, message: "Please input the price!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="bhk" label="BHK" rules={[{ required: true, message: "Please input the number of BHK!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="area" label="Area (Yards)" rules={[{ required: true, message: "Please input the area!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please input the location!" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="city" label="City" rules={[{ required: true, message: "Please select a city!" }]}>
            <Select placeholder="Select a city">
              {cities.map((city) => (
                <Option key={city} value={city}>{city}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="nearbyFacilities" label="Nearby Facilities">
            <Select mode="multiple" placeholder="Select nearby facilities">
              {facilities.map((facility) => (
                <Option key={facility} value={facility}>{facility}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <div className="flex items-center justify-center col-span-2 -mb-8">
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default AddProperty;
