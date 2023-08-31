"use client";
import { Modal } from "@/components/ui/modal";
import { useEffect } from "react"
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";

UserButton

const SetupPage = () => {

    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
      if(!isOpen) {
        onOpen();
      }
    },[isOpen,onOpen]);


    return null;
  }
  
  export default SetupPage;
