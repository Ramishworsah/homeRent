import React, { useContext, useMemo, useState } from 'react';
import AppContext from '../AppContext';
import { GoPlusCircle } from "react-icons/go";
import { Modal } from 'antd';
import AddProperty from './AddProperty';
import Logo from '../assets/logo.png';
import { IoHome } from "react-icons/io5";
import PropertyCard from './PropertyCard';
import LoaderFull from './LoaderFull';

const Rent = () => {
    const { user, properties, loading } = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);

    // Memoize properties filtering to avoid unnecessary re-renders
    const myProperties = useMemo(() => {
        return user?.token ? properties.filter(property => property.sellerEmail === user.email) : [];
    }, [properties, user]);

    if (loading) {
        return <LoaderFull />;
    }

    return user?.token ? (
        <div className="w-full">
            <div className="grid w-full grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                <div 
                    className="flex items-center justify-center w-full cursor-pointer aspect-3/4 bg-primary/10 hover:bg-primary/20 rounded-xl" 
                    onClick={() => setModalOpen(true)}
                >
                    <div className="flex flex-col items-center justify-center w-full h-full gap-4 duration-150 hover:scale-125 text-primary">
                        <GoPlusCircle className="text-6xl" />
                        <span>List your Property</span>
                    </div>
                </div>
                {myProperties.map((property, index) => (
                    <PropertyCard key={property.id || index} property={property} />
                ))}
            </div>
            <Modal
                centered
                footer={false}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                width="fit-content"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="text-3xl text-primary font-[700]">List your</div>
                        <img src={Logo} alt="Company Logo" className="size-10" />
                    </div>
                    <AddProperty setModalOpen={setModalOpen} />
                </div>
            </Modal>
        </div>
    ) : (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center">
            <IoHome className="text-primary/50 text-9xl" />
            <span className="text-4xl text-center text-primary/50">
                Login/Register to <br />List your Properties!
            </span>
        </div>
    );
};

export default Rent;
