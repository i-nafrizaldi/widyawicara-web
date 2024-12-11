"use client";

import React, { FC } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Label } from "./ui/label";

interface DropzoneProps {
  label: string;
  onDrop: (files: FileWithPath[]) => void;
}

const Dropzone: FC<DropzoneProps> = ({ label, onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div className=" space-y-1.5">
      <Label>{label}</Label>

      <div
        {...getRootProps({
          className: "p-10 border flex justify-center rounded-md",
        })}
      >
        <input {...getInputProps()} />
        <Label className="text-base">
          Drag & drop some file here, or click to select files
        </Label>
      </div>
    </div>
  );
};

export default Dropzone;
