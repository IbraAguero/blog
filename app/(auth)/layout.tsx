const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid place-content-center h-[calc(100vh-6rem)]">
      {children}
    </div>
  );
};

export default AuthLayout;
