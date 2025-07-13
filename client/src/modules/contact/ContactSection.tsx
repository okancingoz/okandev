import ContactForm from "./ContactForm";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-24 px-4 text-white bg-black relative z-10"
    >
      <h2 className="text-3xl font-bold text-center mb-10">Contact Me</h2>
      <ContactForm />
    </section>
  );
};
export default ContactSection;
