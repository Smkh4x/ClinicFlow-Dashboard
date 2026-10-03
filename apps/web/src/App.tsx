import { useState, useEffect } from 'react';
import { api } from './services/api';
import {
  Brand,
  IconDashboard,
  IconPatients,
  IconAppointments,
  IconSettings,
  IconLogout,
  IconEdit,
  IconTrash,
  IconSearch,
  IconMenu,
  IconBack,
  IconMoon,
  IconSun
} from './components/Icons';

function Shell({ active, crumb, theme, toggleTheme, children }: { active: string; crumb: string; theme: string; toggleTheme: () => void; children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: <IconDashboard className="icon" /> },
    { id: 'patients', label: 'Patients', icon: <IconPatients className="icon" /> },
    { id: 'appointments', label: 'Appointments', icon: <IconAppointments className="icon" /> }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.hash = 'login';
  };

  return (
    <div className={`app ${menuOpen ? 'open' : ''}`}>
      <aside aria-label="Main">
        <div style={{ padding: '4px 8px 20px' }}>
          <Brand size={28} />
        </div>
        <nav>
          {nav.map(n => (
            <button
              key={n.id}
              className={`nv ${active === n.id ? 'on' : ''}`}
              onClick={() => { window.location.hash = n.id; setMenuOpen(false); }}
              aria-current={active === n.id ? 'page' : undefined}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>
        <div className="bot">
          <button className="nv" onClick={() => window.location.hash = 'dashboard'}>
            <IconSettings className="icon" />Settings
          </button>
          {user && (
            <div className="me">
              <div className="av">{user.email.substring(0, 2).toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500 }}>{user.email.split('@')[0]}</div>
                <div className="cap" style={{ textTransform: 'capitalize' }}>{user.role}</div>
              </div>
              <button className="ib" title="Log out" aria-label="Log out" onClick={logout}>
                <IconLogout className="icon" />
              </button>
            </div>
          )}
        </div>
      </aside>
      <div className="ov" onClick={() => setMenuOpen(false)}></div>
      <div className="main">
        <header className="top">
          <button className="burger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <IconMenu className="icon" />
          </button>
          <span className="crumb">{crumb}</span>
          <span className="sp"></span>
          <button className="ib" aria-label="Toggle theme" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <IconSun className="icon" /> : <IconMoon className="icon" />}
          </button>
          {user && <span className="role" style={{ textTransform: 'capitalize' }}>{user.role}</span>}
        </header>
        <main className="page">
          {children}
        </main>
      </div>
    </div>
  );
}

const bd = (s: string) => <span className={`bd ${s.toLowerCase()}`}>{s}</span>;
const ini = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

function AnimatedBrand() {
  return (
    <div className="animated-brand">
      <svg className="ab-logo" width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g stroke="var(--logo)" strokeWidth="2" fill="none" strokeLinecap="round">
          <circle cx="50" cy="50" r="8" />
          <rect x="46" y="16" width="8" height="22" rx="4" />
          <rect x="46" y="62" width="8" height="26" rx="4" />
          <rect x="20" y="46" width="18" height="8" rx="4" />
          <rect x="62" y="46" width="22" height="8" rx="4" />
          <circle cx="76" cy="28" r="5" />
          <circle cx="28" cy="76" r="4" opacity="0.6" />
        </g>
      </svg>
      <div className="ab-text"><b>Clinic</b><span>Flow</span></div>
    </div>
  );
}

function ThemeTransitionOverlay({ targetTheme }: { targetTheme: string }) {
  return (
    <div className={`theme-transition-overlay to-${targetTheme}`}>
      <svg className="tt-logo" width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g stroke="var(--logo)" strokeWidth="2" fill="none" strokeLinecap="round">
          <circle cx="50" cy="50" r="8" />
          <rect x="46" y="16" width="8" height="22" rx="4" />
          <rect x="46" y="62" width="8" height="26" rx="4" />
          <rect x="20" y="46" width="18" height="8" rx="4" />
          <rect x="62" y="46" width="22" height="8" rx="4" />
          <circle cx="76" cy="28" r="5" />
          <circle cx="28" cy="76" r="4" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 0', width: '100%' }}>
      <svg className="loader-logo" width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g stroke="var(--logo)" strokeWidth="2" fill="none" strokeLinecap="round">
          <circle cx="50" cy="50" r="8" />
          <rect x="46" y="16" width="8" height="22" rx="4" />
          <rect x="46" y="62" width="8" height="26" rx="4" />
          <rect x="20" y="46" width="18" height="8" rx="4" />
          <rect x="62" y="46" width="22" height="8" rx="4" />
          <circle cx="76" cy="28" r="5" />
          <circle cx="28" cy="76" r="4" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('admin@clinicflow.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState((window as any).__theme || 'light');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.login({ email, password });
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      window.location.hash = 'dashboard';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const toggleTheme = () => {
    (window as any).__toggleTheme();
    setTheme((window as any).__theme);
  };

  return (
    <div className="login">
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <button type="button" className="ib" aria-label="Toggle theme" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <IconSun className="icon" /> : <IconMoon className="icon" />}
        </button>
      </div>
      <form className="lf" onSubmit={handleLogin}>
        <div style={{ marginBottom: 32 }}>
          <Brand size={40} />
        </div>
        <h1>Sign in</h1>
        <p className="muted" style={{ margin: '4px 0 24px' }}>Access your clinic workspace.</p>
        
        {error && <div style={{ color: 'var(--er)', marginBottom: 16 }}>{error}</div>}

        <div className="fld">
          <label htmlFor="em">Email</label>
          <input id="em" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="fld">
          <label htmlFor="pw">Password</label>
          <input id="pw" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn pri" style={{ width: '100%', height: 40, justifyContent: 'center' }}>Sign in</button>
      </form>
      <div className="login-hero">
        <AnimatedBrand />
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    api.getDashboard().then(setStats).catch(console.error);
    const today = new Date().toISOString().split('T')[0];
    api.getAppointments({ date: today }).then(setAppointments).catch(console.error);
  }, []);

  if (!stats) return <Shell active="dashboard" crumb="Dashboard" theme={''} toggleTheme={()=>{}}><Loader /></Shell>;

  return (
    <Shell active="dashboard" crumb="Dashboard" theme={(window as any).__theme} toggleTheme={(window as any).__toggleTheme}>
      <div className="ph">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <button className="btn pri" onClick={() => window.location.hash = 'appt-new'}>+ New appointment</button>
      </div>
      <div className="stats">
        <div className="card st hi">
          <div className="cap">Today's appointments</div>
          <div className="n">{stats.todayAppointments}</div>
        </div>
        <div className="card st">
          <div className="cap">Pending</div>
          <div className="n">{stats.pendingCount}</div>
        </div>
        <div className="card st">
          <div className="cap">Confirmed</div>
          <div className="n">{stats.confirmedCount}</div>
        </div>
        <div className="card st">
          <div className="cap">Total patients</div>
          <div className="n">{stats.totalPatients}</div>
        </div>
      </div>
      <div className="g2">
        <div className="card">
          <div className="ch">
            <h2>Today's schedule</h2>
            <a href="#appointments">View all</a>
          </div>
          {appointments.length === 0 && <p className="muted">No appointments today.</p>}
          {appointments.map((a, i) => (
            <div className="ap" key={i}>
              <span className="tm">{new Date(a.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500 }}>{a.patient_name}</div>
                <div className="cap">{a.reason}</div>
              </div>
              {bd(a.status)}
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 20, alignSelf: 'start' }}>
          <h2>Status breakdown (All Time)</h2>
          <div className="bar">
            {stats.confirmedCount > 0 && <i style={{ width: `${stats.confirmedCount / (stats.confirmedCount + stats.pendingCount) * 100}%`, background: 'var(--ok)' }}></i>}
            {stats.pendingCount > 0 && <i style={{ width: `${stats.pendingCount / (stats.confirmedCount + stats.pendingCount) * 100}%`, background: 'var(--wn)' }}></i>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            {bd('confirmed')}<b>{stats.confirmedCount}</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            {bd('pending')}<b>{stats.pendingCount}</b>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Patients() {
  const [q, setQ] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      api.getPatients({ search: q }).then(res => setPatients(res)).catch(console.error).finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(delay);
  }, [q]);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await api.deletePatient(id);
        setPatients(patients.filter(p => p.id !== id));
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <Shell active="patients" crumb="Patients" theme={(window as any).__theme} toggleTheme={(window as any).__toggleTheme}>
      <div className="ph">
        <div>
          <h1>Patients</h1>
          <p className="muted">Manage patient records.</p>
        </div>
        <button className="btn pri" onClick={() => window.location.hash = 'patient-new'}>+ Add patient</button>
      </div>
      <div className="tool">
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <input
            placeholder="Search by name or CIN"
            value={q}
            onChange={e => setQ(e.target.value)}
            aria-label="Search patients"
          />
        </div>
      </div>
      <div className="card">
        {loading ? (
          <Loader />
        ) : patients.length > 0 ? (
          <>
            <div className="tbw">
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>CIN</th>
                    <th>Phone</th>
                    <th>Birth date</th>
                    <th className="r">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(p => (
                    <tr key={p.id}>
                      <td>
                        <a href={`#patient/${p.id}`} style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--t)', fontWeight: 500 }}>
                          <span className="av">{ini(p.full_name)}</span>{p.full_name}
                        </a>
                      </td>
                      <td>{p.cin}</td>
                      <td>{p.phone}</td>
                      <td>{new Date(p.birth_date).toLocaleDateString()}</td>
                      <td className="r">
                        <button className="ib" aria-label={`Edit ${p.full_name}`} onClick={() => window.location.hash = `patient-edit/${p.id}`}><IconEdit /></button>
                        <button className="ib d" aria-label={`Delete ${p.full_name}`} onClick={() => handleDelete(p.id, p.full_name)}><IconTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="empty">
            <div className="ic"><IconSearch /></div>
            <h2>No patients found</h2>
            <p className="muted">No results for "{q}". Check the spelling or search by CIN.</p>
          </div>
        )}
      </div>
    </Shell>
  );
}

function PatientDetails({ id }: { id: string }) {
  const [patient, setPatient] = useState<any>(null);
  
  useEffect(() => {
    api.getPatient(id).then(setPatient).catch(console.error);
  }, [id]);

  if (!patient) return <Shell active="patients" crumb="Patients" theme={''} toggleTheme={()=>{}}><Loader /></Shell>;

  const L = patient.appointments || [];

  return (
    <Shell active="patients" crumb={`Patients / ${patient.full_name}`} theme={(window as any).__theme} toggleTheme={(window as any).__toggleTheme}>
      <button className="back" onClick={() => window.location.hash = 'patients'}>
        <IconBack /> Patients
      </button>
      <div className="ph">
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span className="av" style={{ width: 48, height: 48, fontSize: 16 }}>{ini(patient.full_name)}</span>
          <div>
            <h1>{patient.full_name}</h1>
            <p className="muted">CIN {patient.cin}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => window.location.hash = `patient-edit/${id}`}>Edit</button>
          <button className="btn pri" onClick={() => window.location.hash = `appt-new?patientId=${id}`}>+ Appointment</button>
        </div>
      </div>
      <div className="det">
        <div className="card">
          <div className="ch">
            <h2>Patient information</h2>
          </div>
          <dl className="kv">
            <dt>CIN</dt><dd>{patient.cin}</dd>
            <dt>Phone</dt><dd>{patient.phone}</dd>
            <dt>Birth date</dt><dd>{new Date(patient.birth_date).toLocaleDateString()}</dd>
            <dt>Address</dt><dd>{patient.address || 'N/A'}</dd>
          </dl>
        </div>
        <div className="card">
          <div className="ch">
            <h2>Appointments</h2>
            <span className="cap">{L.length} total</span>
          </div>
          {L.length === 0 && <p className="muted">No appointments found.</p>}
          {L.map((a: any) => (
            <div className="ap" key={a.id}>
              <div style={{ width: 96 }}>
                <div style={{ fontWeight: 500 }}>{new Date(a.appointment_date).toLocaleDateString()}</div>
                <div className="cap">{new Date(a.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>{a.reason}</div>
              {bd(a.status)}
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function Appointments() {
  const [fs, setFs] = useState('');
  const [date, setDate] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    setLoading(true);
    api.getAppointments({ date, status: fs.toLowerCase() })
       .then(setAppointments)
       .catch(console.error)
       .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, [fs, date]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateAppointmentStatus(id, status);
      fetchAppointments();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Shell active="appointments" crumb="Appointments" theme={(window as any).__theme} toggleTheme={(window as any).__toggleTheme}>
      <div className="ph">
        <div>
          <h1>Appointments</h1>
          <p className="muted">Schedule and track visits.</p>
        </div>
        <button className="btn pri" onClick={() => window.location.hash = 'appt-new'}>+ New appointment</button>
      </div>
      <div className="tool">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} aria-label="Date" />
        <select aria-label="Status" value={fs} onChange={e => setFs(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {(date || fs) && <button className="btn" onClick={() => { setDate(''); setFs(''); }}>Clear filters</button>}
      </div>
      <div className="card">
        {loading ? (
          <Loader />
        ) : appointments.length > 0 ? (
          <div className="tbw">
            <table>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Patient</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th className="r">Update</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 600 }}>{new Date(a.appointment_date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td>
                      <a href={`#patient/${a.patient_id}`} style={{ color: 'var(--t)', fontWeight: 500 }}>{a.patient_name}</a>
                    </td>
                    <td className="muted">{a.reason}</td>
                    <td>{bd(a.status)}</td>
                    <td className="r">
                      <select 
                        aria-label="Change status" 
                        value={a.status} 
                        style={{ width: 130, height: 32 }} 
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">
            <div className="ic"><IconAppointments /></div>
            <h2>No appointments</h2>
            <p className="muted">Nothing matches these filters.</p>
          </div>
        )}
      </div>
    </Shell>
  );
}

function PatientForm({ id }: { id?: string }) {
  const [patient, setPatient] = useState({ fullName: '', cin: '', phone: '', birthDate: '', address: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      api.getPatient(id).then(data => {
        setPatient({
          fullName: data.full_name,
          cin: data.cin,
          phone: data.phone,
          birthDate: new Date(data.birth_date).toISOString().split('T')[0],
          address: data.address || ''
        });
      }).catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (id) {
        await api.updatePatient(id, patient);
      } else {
        await api.createPatient(patient);
      }
      window.location.hash = 'patients';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Shell active="patients" crumb={id ? 'Edit patient' : 'New patient'} theme={(window as any).__theme} toggleTheme={(window as any).__toggleTheme}>
      <button className="back" onClick={() => window.location.hash = 'patients'}>
        <IconBack /> Patients
      </button>
      <div className="ph">
        <h1>{id ? 'Edit patient' : 'Add patient'}</h1>
      </div>
      <form className="card form" onSubmit={handleSubmit}>
        {error && <div style={{ color: 'var(--er)', marginBottom: 16 }}>{error}</div>}
        <div className="fld">
          <label htmlFor="f1">Full name</label>
          <input id="f1" required value={patient.fullName} onChange={e => setPatient({ ...patient, fullName: e.target.value })} />
        </div>
        <div className="row2">
          <div className="fld">
            <label htmlFor="f2">CIN</label>
            <input id="f2" required value={patient.cin} onChange={e => setPatient({ ...patient, cin: e.target.value })} />
            <small>National ID card number</small>
          </div>
          <div className="fld">
            <label htmlFor="f3">Phone</label>
            <input id="f3" type="tel" required value={patient.phone} onChange={e => setPatient({ ...patient, phone: e.target.value })} />
          </div>
        </div>
        <div className="fld" style={{ maxWidth: 340 }}>
          <label htmlFor="f4">Birth date</label>
          <input id="f4" type="date" required value={patient.birthDate} onChange={e => setPatient({ ...patient, birthDate: e.target.value })} />
        </div>
        <div className="fld">
          <label htmlFor="f5">Address</label>
          <textarea id="f5" value={patient.address} onChange={e => setPatient({ ...patient, address: e.target.value })}></textarea>
        </div>
        <div className="acts">
          <button type="button" className="btn" onClick={() => window.location.hash = 'patients'}>Cancel</button>
          <button type="submit" className="btn pri">Save patient</button>
        </div>
      </form>
    </Shell>
  );
}

function ApptForm() {
  const [patients, setPatients] = useState<any[]>([]);
  const [appt, setAppt] = useState({ patientId: '', date: '', time: '', status: 'pending', reason: '', notes: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    api.getPatients({ limit: 1000 }).then(res => {
      setPatients(res);
      if (res.length > 0) {
        setAppt(prev => ({ ...prev, patientId: res[0].id }));
      }
    }).catch(console.error);

    // Default to today and current hour
    const d = new Date();
    setAppt(prev => ({ ...prev, date: d.toISOString().split('T')[0], time: d.toTimeString().slice(0, 5) }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const dt = new Date(`${appt.date}T${appt.time}:00`);
      await api.createAppointment({
        patientId: appt.patientId,
        appointmentDate: dt.toISOString(),
        status: appt.status,
        reason: appt.reason,
        notes: appt.notes
      });
      window.location.hash = 'appointments';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Shell active="appointments" crumb="New appointment" theme={(window as any).__theme} toggleTheme={(window as any).__toggleTheme}>
      <button className="back" onClick={() => window.location.hash = 'appointments'}>
        <IconBack /> Appointments
      </button>
      <div className="ph">
        <h1>New appointment</h1>
      </div>
      <form className="card form" onSubmit={handleSubmit}>
        {error && <div style={{ color: 'var(--er)', marginBottom: 16 }}>{error}</div>}
        <div className="fld">
          <label htmlFor="a1">Patient</label>
          <select id="a1" required value={appt.patientId} onChange={e => setAppt({ ...appt, patientId: e.target.value })}>
            {patients.map(p => <option key={p.id} value={p.id}>{p.full_name} — {p.cin}</option>)}
          </select>
        </div>
        <div className="row2">
          <div className="fld">
            <label htmlFor="a2">Date</label>
            <input id="a2" type="date" required value={appt.date} onChange={e => setAppt({ ...appt, date: e.target.value })} />
          </div>
          <div className="fld">
            <label htmlFor="a3">Time</label>
            <input id="a3" type="time" required value={appt.time} onChange={e => setAppt({ ...appt, time: e.target.value })} />
          </div>
        </div>
        <div className="fld" style={{ maxWidth: 340 }}>
          <label htmlFor="a4">Status</label>
          <select id="a4" value={appt.status} onChange={e => setAppt({ ...appt, status: e.target.value })}>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="fld">
          <label htmlFor="a5">Reason</label>
          <input id="a5" required placeholder="e.g. Follow-up consultation" value={appt.reason} onChange={e => setAppt({ ...appt, reason: e.target.value })} />
        </div>
        <div className="fld">
          <label htmlFor="a6">Notes <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></label>
          <textarea id="a6" value={appt.notes} onChange={e => setAppt({ ...appt, notes: e.target.value })}></textarea>
        </div>
        <div className="acts">
          <button type="button" className="btn" onClick={() => window.location.hash = 'appointments'}>Cancel</button>
          <button type="submit" className="btn pri">Create appointment</button>
        </div>
      </form>
    </Shell>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || 'login');
  
  // Theme logic
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState('light');

  useEffect(() => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    
    setTargetTheme(nextTheme);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setTheme(nextTheme);
    }, 1000);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 2200);
  };
  
  (window as any).__theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  (window as any).__toggleTheme = toggleTheme;

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.slice(1) || 'login');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && route !== 'login') {
      window.location.hash = 'login';
    } else if (token && route === 'login') {
      window.location.hash = 'dashboard';
    }
  }, [route]);

  const [r, id] = route.split('/');

  const renderPage = () => {
    if (r === 'login') return <Login />;
    if (r === 'dashboard') return <Dashboard />;
    if (r === 'patients') return <Patients />;
    if (r === 'appointments') return <Appointments />;
    if (r === 'patient') return <PatientDetails id={id} />;
    if (r === 'patient-new') return <PatientForm />;
    if (r === 'patient-edit') return <PatientForm id={id} />;
    if (r === 'appt-new') return <ApptForm />;
    return <Login />;
  };

  return (
    <>
      {renderPage()}
      {isTransitioning && <ThemeTransitionOverlay targetTheme={targetTheme} />}
    </>
  );
}

export default App;
