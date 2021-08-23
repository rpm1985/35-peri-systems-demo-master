import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import DesignerBoard from "../Designer/DesignerBoard";
import TechnicalBoard from "../Technical/TechnicalBoard";
import AdminBoard from "../Admin/AdminBoard"
import { SalesBoard } from "../Sales/SalesBoard";

const Dashboard = () => {
    const [showTechnicalBoard, setShowTechnicalBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showDesignerBoard, setShowDesignerBoard] = useState(false);
    const [showSalesBoard, setShowSalesBoard] = useState(false)
    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user)

        if (user) {
            if (user.roles.includes("ROLE_TECHNICAL")) {
                setShowTechnicalBoard(true)
            } else if (user.roles.includes('ROLE_ADMIN')) {
                setShowAdminBoard(true)
            } else if (user.roles.includes('ROLE_DESIGNER')) {
                setShowDesignerBoard(true)
            } else if (user.roles.includes('ROLE_SALES')) {
                setShowSalesBoard(true)
            } else {
                setError('You don\'t have any roles, please contact an administrator')
            }
        }
    }, []);

    return (
        <div>
            {currentUser ? (
                <div>
                    {showDesignerBoard && <DesignerBoard />}
                    {showTechnicalBoard && <TechnicalBoard />}
                    {showAdminBoard && <AdminBoard />}
                    {showSalesBoard && <SalesBoard />}
                    {error ? error : ''}
                </div>
            ) : (
                <div>Not Logged in</div>
            )}
        </div>
    );
};
export default Dashboard;
