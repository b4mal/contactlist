import Link from "next/link";

interface ContactFormProps {
  post: {
    contName: string;
    contNumber: string;
    tag: string;
  };
  setPost: React.Dispatch<
    React.SetStateAction<{ contName: string; contNumber: string; tag: string }>
  >;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  return (
    <form
      className="my-10 w-full max-w-2xl flex flex-col gap-7"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-1">
        <label htmlFor="contName" className="font-medium text-gray-700">
          Contact Name
        </label>
        <input
          type="text"
          id="contName"
          name="contName"
          placeholder="John Doe"
          required
          autoFocus
          className="border rounded px-3 py-2"
          value={post.contName}
          onChange={(e) =>
            setPost((prev) => ({
              ...prev,
              contName: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="contNumber" className="font-medium text-gray-700">
          Contact Number
        </label>
        <input
          type="tel"
          id="contNumber"
          name="contNumber"
          placeholder="+91 12345 67890"
          required
          className="border rounded px-3 py-2"
          value={post.contNumber}
          onChange={(e) =>
            setPost((prev) => ({
              ...prev,
              contNumber: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="tag" className="font-medium text-gray-700">
          Tag
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          placeholder="Friend / Family"
          required
          className="border rounded px-3 py-2"
          value={post.tag}
          onChange={(e) =>
            setPost((prev) => ({
              ...prev,
              tag: e.target.value,
            }))
          }
        />
      </div>

      {/* The action buttons */}
      <div className="flex items-center justify-end gap-5">
        <Link href={"/"} className="text-gray-500 text-sm">
          Cancel
        </Link>

        <button type="submit" className="blk_btn" disabled={submitting}>
          {submitting ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
