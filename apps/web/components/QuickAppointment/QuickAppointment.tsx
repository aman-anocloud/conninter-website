import styles from './QuickAppointment.module.css';

export default function QuickAppointment() {
    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.container}`}>
                <div className={styles.bar}>
                    <div className={styles.item}>
                        <label>Department</label>
                        <select>
                            <option>General Medicine</option>
                            <option>Cardiology</option>
                            <option>Pediatrics</option>
                            <option>Orthopedics</option>
                        </select>
                    </div>
                    <div className={styles.item}>
                        <label>Doctor Name</label>
                        <input type="text" placeholder="Ex. Dr. Sharma" />
                    </div>
                    <div className={styles.item}>
                        <label>Choose Date</label>
                        <input type="date" />
                    </div>
                    <button className="btn-primary">
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}
