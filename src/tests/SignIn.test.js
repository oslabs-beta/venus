import { render } from "@testing-library/react";
import { SignIn } from "../containers/SignInContainer";

it('expects button to be in SignIN component', () => {
  const { queryByTestId } = render(<SignIn />);
  const addSignInButton = queryByTestId("signin-button");
  expect(addSignInButton).toBeInTheDocument();
})