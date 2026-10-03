import React from 'react';

export const Logo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="var(--logo)">
      <circle cx="50" cy="50" r="8" />
      <rect x="46" y="16" width="8" height="22" rx="4" />
      <rect x="46" y="62" width="8" height="26" rx="4" />
      <rect x="20" y="46" width="18" height="8" rx="4" />
      <rect x="62" y="46" width="22" height="8" rx="4" />
      <circle cx="76" cy="28" r="5" />
      <circle cx="28" cy="76" r="4" opacity="0.6" />
    </g>
  </svg>
);

export const Brand = ({ size = 28 }: { size?: number }) => (
  <div className="brand">
    <Logo size={size} />
    <div><b>Clinic</b><span>Flow</span></div>
  </div>
);

type IconProps = React.SVGProps<SVGSVGElement>;

export const IconDashboard = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
);

export const IconPatients = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .6 3.3 2.3 3.6 5"/></svg>
);

export const IconAppointments = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
);

export const IconSettings = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2-1.2L14.3 3h-4l-.3 2.7a7 7 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2 1.2l.3 2.7h4l.3-2.7a7 7 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></svg>
);

export const IconLogout = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
);

export const IconEdit = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><path d="M4 20h4L19 9l-4-4L4 16v4z"/></svg>
);

export const IconTrash = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>
);

export const IconSearch = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
);

export const IconMenu = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
);

export const IconBack = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><path d="m15 18-6-6 6-6"/></svg>
);

export const IconMoon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

export const IconSun = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
