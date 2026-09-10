"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import RcTiptapEditor, {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Color,
  ColumnActionButton,
  Emoji,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,
  Image,
  ImportWord,
  Indent,
  Italic,
  Katex,
  LineHeight,
  Link,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  TaskList,
  TextAlign,
  Underline,
  Video,
  TextDirection,
  Mention,
  Attachment,
  Mermaid,
  Twitter,
  

} from "reactjs-tiptap-editor";
import "katex/dist/katex.min.css";
import ReactDOMServer from "react-dom/server";
import "../../app/style.css";
import { Paragraph } from "@tiptap/extension-paragraph";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { TEMP_IMAGE_PATH } from "@/app/utils/constant";

function convertBase64ToBlob(base64) {
  const arr = base64.split(",");
  const match = arr[0].match(/:(.*?);/);
  const mime = match ? match[1] : null;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const createObjectUrlUpload = (files) => {
  const file = Array.isArray(files) ? files[0] : files;

  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected"));
      return;
    }

    setTimeout(() => {
      resolve(URL.createObjectURL(file));
    }, 500);
  });
};

const uploadEditorImage = async (files, uploadPath = "") => {
  const file = Array.isArray(files) ? files[0] : files;

  if (!file) {
    throw new Error("No file selected");
  }

  if (!uploadPath) {
    return createObjectUrlUpload(file);
  }

  const formData = new FormData();
  formData.append("image", file);
  
  const moduleName = uploadPath.split("/")[0].replace(/-/g, "_");
  formData.append("uploadPath", moduleName);

  try {
    const { data } = await axiosInstance.post(uploadPath, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (!data?.filePath) {
      throw new Error("Image upload did not return a file path");
    }

    return encodeURI(`${TEMP_IMAGE_PATH}${data.filePath}`);
  } catch (error) {
    console.error("Editor image upload failed, falling back to local blob:", error);
    return createObjectUrlUpload(file);
  }
};

export const getExtensions = ({ imageUploadPath = "" } = {}) => [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
    // paragraph: {
    //   addNodeBefore: (state, dispatch) => {
    //     const { $from } = state.selection;
    //     if ($from.parent.content.size === 0) {
    //       // If paragraph is empty, insert a <br> tag
    //       dispatch(
    //         state.tr.replaceRangeWith(
    //           $from.pos,
    //           $from.pos,
    //           state.schema.nodes.hard_break.create()
    //         )
    //       );
    //       return true;
    //     }
    //     return false;
    //   },
    // },
  }),
  Paragraph.configure({
    HTMLAttributes: {
      className: "text-md",
    },
  }),
  History,
  SearchAndReplace,
  TextDirection,
  // TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily.configure({
    fontFamilyList: [
      { label: "athelas", value: "athelas" },
      { label: "Inter", value: "'Inter', serif" },
    ],
  }),
  Heading.configure({
    // spacer: true,
    HTMLAttributes: { class: "my-custom-class" },
  }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Katex,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    // spacer: true
  }),
  Indent,
  LineHeight.configure({
    types: ["paragraph", "heading"],
    lineHeights: ["100%", "120%", "140%", "160%", "180%", "200%", "240%"],
    defaultHeight: "100%",
    spacer: true,
  }),
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: (files) => uploadEditorImage(files, imageUploadPath),
  }),
  Video.configure({
    upload: createObjectUrlUpload,
  }),
  // ImageGif.configure({
  //   GIPHY_API_KEY: "dddd",
  // }),
  Blockquote.configure({ spacer: true }),
  SlashCommand,
  HorizontalRule,
  // Code.configure({
  //   toolbar: false,
  // }),
  // CodeBlock.configure({ defaultTheme: "dracula" }),
  ColumnActionButton,
  Table,
  Iframe,
  // ExportPdf.configure({ spacer: true }),
  ImportWord.configure({
    upload: (files) => {
      const f = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      return Promise.resolve(f);
    },
  }),
  // ExportWord,
  // Excalidraw,
  Mention,
  Attachment.configure({
    upload: (file) => {
      // fake upload return base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
  Mermaid.configure({
    upload: (file) => {
      // fake upload return base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
  Twitter,
];

function Editor({
  defaultValue,
  setContent,
  children,
  disabled = false,
  hideToolBar,
  dense = false,
  imageUploadPath = "",
}) {
  const [hiddenToolbar, setHiddenToolbar] = useState(true);
  const [initialContent, setInitialContent] = useState(() => defaultValue || "");
  const isInternalChangeRef = useRef(false);
  const editorExtensions = useMemo(
    () => getExtensions({ imageUploadPath }),
    [imageUploadPath],
  );
  const onValueChange = useCallback(
    (value) => {
      isInternalChangeRef.current = true;
      setContent(value);
    },
    [setContent],
  );
  const htmlString = children
    ? ReactDOMServer.renderToStaticMarkup(children)
    : "";
  useEffect(() => {
    const nextContent = defaultValue || htmlString || "";
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      return;
    }

    if (nextContent !== initialContent) {
      setInitialContent(nextContent);
    }
  }, [defaultValue, htmlString, initialContent]);

  // const customMenu = () => {
  //   return (
  //     <BubbleMenu
  //       className="bubble-menu shadow-md px-3 py-1 flex gap-2  bg-white  border-2 border-gray-700  rounded-sm "
  //       tippyOptions={{ duration: 100 }}
  //       editor={editor}
  //     >
  //       <button
  //         type="button"
  //         onClick={() => editor.chain().focus().toggleBold().run()}
  //       >
  //         <BoldIcon
  //           className={`px-2 py-1  text-gray-600   hover:bg-gray-200 rounded hover:text-black ${
  //             editor?.isActive("bold") ? "is-active" : ""
  //           }`}
  //           size={"35"}
  //         />
  //       </button>
  //       <button
  //         type="button"
  //         onClick={() => editor.chain().focus().toggleItalic().run()}
  //       >
  //         <ItalicIcon
  //           size={"35"}
  //           className={`px-2 py-1 text-gray-600  hover:bg-gray-200 rounded hover:text-black ${
  //             editor?.isActive("italic") ? "is-active" : ""
  //           }`}
  //         />
  //       </button>
  //       <button
  //         type="button"
  //         onClick={() => editor.chain().focus().toggleStrike().run()}
  //       >
  //         <Strikethrough
  //           size={"35"}
  //           className={`px-2 py-1  hover:bg-gray-200 text-gray-600 hover:text-black rounded ${
  //             editor?.isActive("strike") ? "is-active" : ""
  //           }`}
  //         />
  //       </button>
  //       <button
  //         type="button"
  //         onClick={() => editor.chain().focus().toggleBulletList().run()}
  //       >
  //         <List
  //           size={"35"}
  //           className={`px-2 py-1  hover:bg-gray-200 text-gray-600 hover:text-black rounded ${
  //             editor?.isActive("bulletList") ? "is-active" : ""
  //           }`}
  //         />
  //       </button>
  //       <button
  //         type="button"
  //         onClick={() => editor.chain().focus().toggleOrderedList().run()}
  //         className={editor?.isActive("orderedList") ? "is-active" : ""}
  //       >
  //         <ListOrdered
  //           size={"35"}
  //           className={`px-2 py-1  hover:bg-gray-200 text-gray-600 hover:text-black rounded ${
  //             editor?.isActive("bulletList") ? "is-active" : ""
  //           }`}
  //         />
  //       </button>

  //       <button
  //         type="button"
  //         onClick={() => {
  //           setShowTextColorPicker(!showTextColorPicker);
  //           setShowHighlightColorPicker(false);
  //         }}
  //         className="relative"
  //       >
  //         <Baseline
  //           size={"35"}
  //           className={`px-2 py-1  hover:bg-gray-200 text-gray-600 hover:text-black rounded relative
  //           }`}
  //         />
  //         {showTextColorPicker && (
  //           <div className="absolute top-10 left-0">
  //             <HexColorPicker
  //               color="#000000"
  //               onChange={(color) => changeTextColor(color)}
  //             />
  //           </div>
  //         )}
  //       </button>

  //       <button
  //         className="relative"
  //         type="button"
  //         onClick={() => {
  //           setShowHighlightColorPicker(!showHighlightColorPicker);
  //           setShowTextColorPicker(false);
  //         }}
  //       >
  //         <HighlighterIcon
  //           size={"35"}
  //           className="px-2 py-1  hover:bg-gray-200 text-gray-600 hover:text-black rounded relative
  //           "
  //         />
  //         {showHighlightColorPicker && (
  //           <div className="absolute top-10 left-[-40px]">
  //             <HexColorPicker
  //               color="#ffff00"
  //               onChange={(color) => changeHighlightColor(color)}
  //             />
  //           </div>
  //         )}
  //       </button>

  //       <select
  //         onChange={(e) => changeFontSize(e.target.value)}
  //         value=""
  //         style={{ fontSize: ".875rem", fontWeight: "normal" }}
  //       >
  //         {[
  //           "Default",
  //           "12px",
  //           "14px",
  //           "16px",
  //           "18px",
  //           "20px",
  //           "24px",
  //           "32px",
  //         ].map((size) => (
  //           <option key={size} value={size}>
  //             {size}
  //           </option>
  //         ))}
  //       </select>
  //     </BubbleMenu>
  //   );
  // };

  return (
    <div
      className={dense ? "editor-density-compact" : ""}
      style={{
        margin: "auto",
      }}
    >
      <RcTiptapEditor
        className={dense ? "dense" : ""}
        output="html"
        content={initialContent}
        onChangeContent={onValueChange}
        extensions={editorExtensions}
        bubbleMenu={{
          floatingMenuConfig: {
            hidden: true,
          },
          columnConfig: {
            hidden: false,
          },
          // render: (editor, customMenu),
        }}
        disabled={disabled}
        dark={false}
        hideToolbar={hiddenToolbar || hideToolBar}
        useEditorOptions={{
          immediatelyRender: false,
          onFocus: hideToolBar
            ? undefined
            : () => {
                setHiddenToolbar(false);
              },
        }}
      />
    </div>
  );
}

export default Editor;
