#!/usr/bin/env bash
set -Eeuo pipefail

# in case you want to install it multiple times, change install_name to distinguish the installations
install_name="autoskola"
app_desc="Autoskola"



# this is home directory of the service user
home="/var/lib/$install_name"

# cleanup
if systemctl is-active "$install_name" --quiet; then
	systemctl stop "$install_name"
fi

# create user and group
if ! getent passwd "$install_name" &>/dev/null; then
	groupadd "$install_name" --system
	useradd "$install_name" --system --gid "$install_name" --comment "$app_desc" \
			--shell /sbin/nologin --create-home --home-dir "$home"
fi

echo -n "[Unit]
Description=$app_desc

[Service]
Type=simple
Restart=always
WorkingDirectory=$home/node_app
Environment=LOG_STDERR= HOST=127.0.0.1 PORT=11000
ExecStart=npm start

# SECURITY OPTIONS
User=$install_name
Group=$install_name
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
" > "/etc/systemd/system/$install_name.service"

echo ""
echo ""
echo "NOW, UPLOAD CONTENT..."
pause

echo "ENABLING AND STARTING THE SERVICE..."
echo ""
echo "======================================================================="
echo ""
echo "You can safely exit using Ctrl-c now, the service will keep running even after you log out and automatically start after reboot."
echo "Use 'systemctl start/stop/restart \"$install_name\"' commands to control the service manually if needed."
echo "Use 'journalctl -u \"$install_name\" --follow' to view live logs from $install_name."
echo ""
echo "======================================================================="
echo ""

systemctl daemon-reload
systemctl enable "$install_name"
systemctl start "$install_name"

journalctl --follow --no-hostname --lines=0 --unit "$install_name"