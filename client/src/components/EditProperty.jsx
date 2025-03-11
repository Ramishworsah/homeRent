import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Upload, Button, message, ConfigProvider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { postProperty, uploadPropertyImage, updateProperty, getAllProperties } from '../api/property';
import AppContext from '../AppContext';

const { Option } = Select;

const EditProperty = ({property,setModalOpen}) => {
    const { user, properties, setProperties, loading, setLoading } = useContext(AppContext);
    const [fileList, setFileList] = useState([]);

    const cities = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore','Hyderabad','Pune','Nagpur','Kochi','Trivendrum','Indore','vadodara'];
    const facilities = ['School', 'Hospital', 'Supermarket', 'Park', 'Mall', 'Metro', 'Bus Stop', 'Railway Station', 'Airport', 
    'Highway', 'Petrol Pump', 'ATM', 'Bank', 'Market', 'College'];

    const handleUpload = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileList(fileList);
    };

    const handleSubmit = async (values) => {

        const updatedValues = {
            price: values.price,
            bhk: values.bhk,
            area: values.area,
            location: values.location,
            city: values.city,
            nearbyFacilities: values.nearbyFacilities,
        }

        const formData = new FormData();
        fileList.length>0 ? formData.append('image', fileList[0].originFileObj) : null;

        try {
            setLoading(true);
            const response = await updateProperty(property._id,updatedValues,user);
            if(response?._id){
                if(fileList.length>0){
                    const uploadResponse = await uploadPropertyImage(response._id, formData, user);
                    if(uploadResponse?._id){
                        message.success('Property updated successfully');
                    }else{
                        message.success('Unable to update property image');
                    }
                }else{
                    message.success('Property updated successfully');
                }
            }else{
                message.error('Error while updating property');
            }
        } catch (error) {
            message.error('Unable to update property');
        } finally {
            try {
                const response = await getAllProperties(user);
                if(Array.isArray(response)){
                    setProperties(response);
                }else{
                    console.log('Error while fetching properties');
                }
            } catch (error) {
                console.log('Error while fetching properties');
            }
            setLoading(false);
            setModalOpen(false);
        }
    };

    const initialValues = {
        price: property.price,
        bhk: property.bhk,
        area: property.area,
        location: property.location,
        city: property.city,
        nearbyFacilities: property.nearbyFacilities,
    }
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00a200',
                },
            }}
        >
            <Form 
                onFinish={handleSubmit} 
                autoComplete="off" 
                initialValues={initialValues}
                // labelCol={{span: 8,}}
                // wrapperCol={{span: 16,}}
            >
                <div className='grid grid-cols-2 gap-2'>
                <Form.Item
                        name="image"
                        label="Upload Image"
                        // rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Upload
                            name="image"
                            listType="picture"
                            fileList={fileList}
                            beforeUpload={() => false} // Prevent automatic upload
                            onChange={handleUpload}
                            accept="image/*"
                        >
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price (INR)"

                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <InputNumber style={{ width: '100%' }}/>
                    </Form.Item>

                    <Form.Item
                        name="bhk"
                        label="BHK"
                        rules={[{ required: true, message: 'Please input the number of BHK!' }]}
                    >
                        <InputNumber style={{ width: '100%' }}/>
                    </Form.Item>

                    <Form.Item
                        name="area"
                        label="Area (Yards)"
                        rules={[{ required: true, message: 'Please input the area!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: true, message: 'Please input the location!' }]}
                    >
                        <Input defaultValue={property.location}/>
                    </Form.Item>

                    <Form.Item
                        name="city"
                        label="City"
                        rules={[{ required: true, message: 'Please select a city!' }]}
                    >
                        <Select placeholder="Select a city" >
                            {cities.map(city => (
                            <Option key={city} value={city}>{city}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="nearbyFacilities"
                        label="Nearby Facilities"
                        // rules={[{ required: true, message: 'Please select nearby facilities!' }]}
                        className='col-span-2 '
                    >
                        <Select mode="multiple" placeholder="Select nearby facilities" >
                            {facilities.map(facility => (
                            <Option key={facility} value={facility}>{facility}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <div className='flex items-center justify-center col-span-2 -mb-8 '>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </ConfigProvider>
    )
};

export default EditProperty;
