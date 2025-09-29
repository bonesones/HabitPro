export const Logo: React.FC = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="em" height="em" rx="10" fill="#3B82F6" />
    <path
      d="M13.5 13V30C13.5 31.1046 14.3954 32 15.5 32H36"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M17.5 26.5L23 21.5L28 25L34 18.5"
      stroke="white"
      stroke-width="2"
    />
  </svg>
);
