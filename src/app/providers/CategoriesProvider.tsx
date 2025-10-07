"use client";

import { createContext, useEffect, useState } from "react";

import { aFetch } from "@/shared/api";
import { Category } from "@/shared/types";

export const CategoriesContext = createContext<Category[]>([]);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await aFetch<Category[]>("/api/categories");

      if (response.success) {
        setCategories(response.data);
      } else {
        console.error(response.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};
