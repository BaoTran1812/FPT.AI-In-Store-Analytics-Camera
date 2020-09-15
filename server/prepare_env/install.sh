# Install python 3 & things
apt update
apt install -y --no-install-recommends python3 python3-pip vim tmux
pip3 install setuptools
pip3 install wheel
pip3 install docxtpl

# Install Libreoffice 6 <- must be 6, tested on 5 and it didn't work well
apt install -y software-properties-common
add-apt-repository -y ppa:libreoffice/ppa
apt update
apt install -y libreoffice

# Copy Wingdings font for displaying check box
mkdir -p /usr/share/fonts/WindowsFonts
cp WingdingsRegular.ttf /usr/share/fonts/WindowsFonts
chmod 755 /usr/share/fonts/WindowsFonts/*
fc-cache
fc-list | grep Wingdings # just check

