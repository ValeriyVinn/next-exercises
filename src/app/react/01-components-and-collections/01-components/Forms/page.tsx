import FormWrapper from "@/app/react/01-components-and-collections/01-components/Forms/FormWrapper";
import TextInput from "@/app/react/01-components-and-collections/01-components/Forms/TextInput";
import SelectField from "@/app/react/01-components-and-collections/01-components/Forms/SelectField";
import RadioGroup from "@/app/react/01-components-and-collections/01-components/Forms/RadioGroup";
import CheckboxField from "@/app/react/01-components-and-collections/01-components/Forms/CheckboxField";
import SubmitButton from "@/app/react/01-components-and-collections/01-components/Forms/SubmitButton";

export default function Page() {
  return (
    <FormWrapper action="/api/submit" method="post">
      <h1>Practice Form</h1>

      <TextInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />

      <TextInput
        label="Username"
        name="username"
        type="text"
        placeholder="Enter your username"
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
      />

      <SelectField
        label="Choose your role"
        name="role"
        options={[
          { label: "User", value: "user" },
          { label: "Admin", value: "admin" },
          { label: "Guest", value: "guest" },
        ]}
      />

      <RadioGroup
        label="Subscription type"
        name="subscription"
        options={[
          { label: "Free", value: "free" },
          { label: "Pro", value: "pro" },
          { label: "Enterprise", value: "enterprise" },
        ]}
      />

      <CheckboxField
        label="I agree with terms"
        name="terms"
        value="yes"
      />

      <SubmitButton>Subscribe</SubmitButton>
    </FormWrapper>
  );
}
