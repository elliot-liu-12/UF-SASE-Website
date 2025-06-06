"use client";

import { imageUrls } from "@/client/assets/imageUrls";
import type { BlogExpandedProps } from "@/shared/types/blogTypes";
import { cn } from "@/shared/utils";
import React, { useEffect } from "react";
import { useBlogFunctions } from "../../hooks/useBlogsFunctions";
import { Button } from "../ui/button";
import BlogCarousel from "./BlogCarousel";

const BlogExpanded: React.FC<BlogExpandedProps> = ({
  blog,
  isEditing,
  onClose,
  onNavigateNext,
  onNavigatePrev,
  setIsEditing,
  showBackButton = true,
}) => {
  const { startEditingBlog } = useBlogFunctions();
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleClose = () => {
    if (setIsEditing) setIsEditing(false);
    if (onClose) onClose();
  };

  const handleEditButtonClicked = () => {
    if (setIsEditing) {
      setIsEditing(!isEditing);
      // If switching to edit mode, set the current blog
      if (!isEditing) {
        startEditingBlog(blog);
      }
    }
  };

  const renderContent = () => {
    if (!blog.content.includes("##")) {
      return <p className={cn("mb-6 font-redhat", "text-sm text-gray-800 sm:text-base")}>{blog.content}</p>;
    }
    const sections = blog.content.split(/##\s*([^\n]+)/);
    return sections.map((section, idx) => {
      if (idx === 0) {
        return (
          <p key="intro" className={cn("mb-6 font-redhat", "text-sm text-gray-800 sm:text-base")}>
            {section}
          </p>
        );
      }
      if (idx % 2 === 1) {
        return (
          <h2 key={`h-${idx}`} className={cn("mb-2 font-redhat font-bold", "text-lg text-gray-800 sm:text-xl")}>
            {section}
          </h2>
        );
      } else {
        return (
          <p key={`p-${idx}`} className={cn("mb-6 font-redhat", "text-sm text-gray-800 sm:text-base")}>
            {section}
          </p>
        );
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-white">
      <div className="mx-auto max-w-full px-4 py-8 sm:max-w-6xl">
        {/* back button */}
        {showBackButton && (
          <button
            className={cn("mb-6 flex cursor-pointer items-center font-pixelify font-semibold tracking-wider", "text-3xl")}
            onClick={handleClose}
            aria-label="Back to all posts"
          >
            <span className="mr-3 bg-gradient-to-r from-saseGreen to-saseBlue bg-clip-text text-transparent">≪</span>
            <span className="bg-gradient-to-r from-saseGreen to-saseBlue bg-clip-text text-transparent">BACK TO ALL POSTS</span>
          </button>
        )}

        <div className="relative">
          {/* shadow card */}
          <div className="relative rounded-[50px] border-2 border-border bg-white p-4 shadow-lg transition sm:p-8">
            <div className="pointer-events-none absolute left-5 top-5 -z-10 h-full w-full rounded-[50px] bg-gradient-to-b from-saseGreen to-saseBlue" />
            {/* header */}
            <div className="px-4 py-2 text-center">
              <div className="relative flex items-center justify-center">
                <h1 className={cn("font-oswald font-bold text-gray-800", "text-xl sm:text-4xl")}>{blog.title}</h1>
                {blog.displayEditButton && (
                  <Button className="absolute right-0" onClick={handleEditButtonClicked}>
                    {!isEditing ? "Edit" : "Close Editor"}
                  </Button>
                )}
              </div>
              <div className={cn("mt-2 flex items-center justify-center font-redhat", "text-sm text-gray-600 sm:text-base")}>
                <span className="mr-2">{blog.timeUpdated || "15 min read"}</span>
                <span className="mx-2">by {blog.author}</span>
                <span className="ml-2">
                  {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            {/* carousel */}
            <div className="mb-6 mt-4">
              {blog.images.length > 0 ? (
                <BlogCarousel images={blog.images} />
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500">No images available</div>
              )}
              <div className={cn("mt-2 font-redhat", "text-center text-sm text-gray-500 sm:text-base")}>
                {blog.images.length > 0 ? "caption lorem ipsum yuh lots of words to say about this photo" : ""}
              </div>
            </div>
            {/* content */}
            <div
              className={cn(
                "mx-4 mb-8 overflow-y-auto rounded-2xl border-4 border-dashed px-8 py-6",
                "max-h-[70vh] border-saseGreen/40 border-r-saseBlue/60",
              )}
            >
              {renderContent()}
            </div>

            {/* SASE Logo Star */}
            <img
              src={imageUrls["SASELogoStar.png"]}
              alt="Logo"
              className={cn(
                /* mobile */
                "absolute -bottom-10 -right-8 h-24 w-24",
                /* desktop */
                "sm:-bottom-12 sm:-right-12 sm:h-[140px] sm:w-[140px]",
                "object-contain",
              )}
            />
          </div>
        </div>
        {/* nav buttons */}
        <div className="mt-10 flex w-full justify-center gap-10">
          {onNavigatePrev && (
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-white shadow-md" />
              <Button
                onClick={onNavigatePrev}
                className={cn(
                  "relative rounded-full bg-saseBlue font-serif text-lg italic",
                  "text-white shadow-[2px_4px_12px_rgba(0,0,0,0.2)]",
                  "underline decoration-1 underline-offset-4",
                  "z-10 px-6 py-2",
                )}
              >
                &lt; Read last post
              </Button>
            </div>
          )}
          {onNavigateNext && (
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-white shadow-md" />
              <Button
                onClick={onNavigateNext}
                className={cn(
                  "relative rounded-full bg-saseBlue font-serif text-lg italic",
                  "text-white shadow-[2px_4px_12px_rgba(0,0,0,0.2)]",
                  "underline decoration-1 underline-offset-4",
                  "z-10 px-6 py-2",
                )}
              >
                Read next post &gt;
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogExpanded;
