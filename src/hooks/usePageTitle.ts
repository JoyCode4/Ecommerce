'use client'

import { AppDispatch } from "@/lib/store";
import { setPageTitle } from "@/lib/TitleSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const usePageTitle = (title:string)=>{
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(setPageTitle(title));
    },[])
}