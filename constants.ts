
export const INITIAL_XML_DATA = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE nmaprun>
<?xml-stylesheet href="file:///usr/bin/../share/nmap/nmap.xsl" type="text/xsl"?>
<nmaprun scanner="nmap" args="nmap -sV -O -oX - scanme.nmap.org" start="1672483200" startstr="Fri Dec 31 12:00:00 2023" version="7.92" xmloutputversion="1.05">
<scaninfo type="syn" protocol="tcp" numservices="1000" services="1-1000"/>
<verbose level="0"/>
<debugging level="0"/>
<host starttime="1672483201" endtime="1672483210"><status state="up" reason="syn-ack" reason_ttl="0"/>
<address addr="45.33.32.156" addrtype="ipv4"/>
<hostnames>
<hostname name="scanme.nmap.org" type="user"/>
<hostname name="scanme.nmap.org" type="PTR"/>
</hostnames>
<ports><port protocol="tcp" portid="22"><state state="open" reason="syn-ack" reason_ttl="0"/><service name="ssh" product="OpenSSH" version="6.6.1p1 Ubuntu 2ubuntu2.13" ostype="Linux" method="probed" conf="10"><cpe>cpe:/a:openbsd:openssh:6.6.1p1</cpe><cpe>cpe:/o:linux:linux_kernel</cpe></service></port>
<port protocol="tcp" portid="80"><state state="open" reason="syn-ack" reason_ttl="0"/><service name="http" product="Apache httpd" version="2.4.7" extrainfo="(Ubuntu)" method="probed" conf="10"><cpe>cpe:/a:apache:http_server:2.4.7</cpe></service></port>
<port protocol="tcp" portid="9929"><state state="open" reason="syn-ack" reason_ttl="0"/><service name="nping-echo" product="Nping echo" version="0.7.70" method="probed" conf="10"/></port>
</ports>
<os>
<portused state="open" proto="tcp" portid="22"/>
<portused state="closed" proto="tcp" portid="1"/>
<portused state="closed" proto="udp" portid="39702"/>
<osmatch name="Linux 3.10 - 4.11" accuracy="93" line="61524">
<osclass type="general purpose" vendor="Linux" osfamily="Linux" osgen="3.X" accuracy="93"><cpe>cpe:/o:linux:linux_kernel:3</cpe></osclass>
<osclass type="general purpose" vendor="Linux" osfamily="Linux" osgen="4.X" accuracy="93"><cpe>cpe:/o:linux:linux_kernel:4</cpe></osclass>
</osmatch>
</os>
<uptime seconds="31337" lastboot="Thu Dec 29 10:47:03 2023"/>
<distance value="10"/>
<tcpsequence index="258" difficulty="Good luck!" values="DEADBEEF,C000105E,BADC0DE,F00DCAFE,CAFEBABE,BEEFDEAD"/>
<ipidsequence class="All zeros" values="0,0,0,0,0,0"/>
<tcptssequence class="1000HZ" values="12345678,12345688,12345698,12345708,12345718,12345728"/>
</host>
<runstats><finished time="1672483215" timestr="Fri Dec 31 12:00:15 2023" elapsed="15" summary="Nmap done at Fri Dec 31 12:00:15 2023; 1 IP address (1 host up) scanned in 15.00 seconds" exit="success"/><hosts up="1" down="0" total="1"/>
</runstats>
</nmaprun>
`;