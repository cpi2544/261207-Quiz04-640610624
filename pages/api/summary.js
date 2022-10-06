import { readUsersDB, writeUsersDB } from "../../backendLibs/dbLib";
import { checkToken } from "../../backendLibs/checkToken";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin)
      return res.status(403).json({
        ok: false,
        message: "Permission denied",
      });

    //compute DB summary
    const users = readUsersDB();
    let usernum = 0;
    let adminnum = 0;
    let moneysum = 0;
    users.forEach((x) => {
      if (x.isAdmin) adminCount++;
      else {
        userCount++;
        totalMoney = totalMoney + x.money;
      }
    });
    //return response
    return res.status(200).json({
      ok: true,
      userCount: usernum,
      adminCount: adminnum,
      totalMoney: moneysum,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
